import type { Post, PostBlock, PostSummary } from './types';

const posts: Post[] = [
	{
		slug: 'understanding-aes-256-cbc-in-go',
		title: 'Understanding AES-256-CBC by building it in Go',
		description:
			'I wanted to understand what actually happens when an application encrypts data, so I built a small AES-256-CBC implementation in Go instead of treating encryption as a black box.',
		date: '2026-11-25',
		tags: ['Go', 'Cryptography', 'Backend'],
		accent: '#22c55e',
		content: [
			{
				type: 'paragraph',
				text: 'Encryption is one of those things that is easy to use and surprisingly easy to misunderstand. A library can turn a piece of plaintext into unreadable bytes in a few lines, but that does not explain what the key is doing, why an IV exists, or why the encrypted result cannot simply be stored as a normal string.'
			},
			{
				type: 'paragraph',
				text: 'I wanted to understand those details from the implementation rather than only memorizing an API. So I built a small example in Go using AES-256-CBC, SHA-256 for deriving a 32-byte key from a passphrase, a randomly generated IV, PKCS#7-style padding, and Base64 encoding for the final ciphertext.'
			},
			{
				type: 'heading',
				level: 2,
				text: 'Starting with a plaintext message'
			},
			{
				type: 'paragraph',
				text: 'The example starts with something intentionally simple: a plaintext message and a passphrase. The passphrase is not used directly as the AES key. Instead, it is hashed with SHA-256 so the resulting digest is 32 bytes long, which matches the key size required by AES-256.'
			},
			{
				type: 'code',
				language: 'go',
				code: `const (
	plaintext  = "My secret message 1234"
	passphrase = "3sc3RLrpd17"
  )

  h := sha256.New()
  h.Write([]byte(passphrase))
  key := h.Sum(nil)

  fmt.Printf("Key: %s\\n", hex.EncodeToString(key))`
			},
			{
				type: 'paragraph',
				text: 'The important part here is the distinction between a passphrase and an AES key. The passphrase is something a user can remember or configure. AES-256 expects a 32-byte key. SHA-256 gives the example a deterministic 32-byte value from the passphrase.'
			},
			{
				type: 'heading',
				level: 2,
				text: 'The key is only half of the story'
			},
			{
				type: 'paragraph',
				text: 'AES is a block cipher with a 16-byte block size. CBC mode also needs an Initialization Vector, commonly called an IV. The IV is not the secret key. It is additional input that makes the encryption of the same plaintext different when a fresh IV is used.'
			},
			{
				type: 'code',
				language: 'go',
				code: `iv := make([]byte, 16)
  rand.Read(iv)`
			},
			{
				type: 'paragraph',
				text: 'The example generates the IV with a cryptographically secure random source. The IV can be stored or transmitted alongside the ciphertext; it does not need to be kept secret like the key. What matters is that it should not be reused with the same key in a way that compromises the encryption scheme.'
			},
			{
				type: 'heading',
				level: 2,
				text: 'Why padding is necessary'
			},
			{
				type: 'paragraph',
				text: 'CBC operates on complete blocks. A message such as "My secret message 1234" does not necessarily have a length that is an exact multiple of 16 bytes, so the plaintext needs padding before AES can process it.'
			},
			{
				type: 'code',
				language: 'go',
				code: `func pkcs7pad256(data []byte) []byte {
	dataLen := len(data)
	padLen := blockSize % dataLen
	padding := bytes.Repeat(
		[]byte{byte(padLen)},
		padLen,
	)

	return append(data, padding...)
  }`
			},
			{
				type: 'paragraph',
				text: 'Padding adds bytes to the end of the plaintext so its length becomes aligned with the cipher block size. During decryption, the padding has to be validated and removed again before the original plaintext can be returned.'
			},
			{
				type: 'heading',
				level: 2,
				text: 'Encrypting with AES-256-CBC'
			},
			{
				type: 'paragraph',
				text: 'Once the key, IV, and padded plaintext are ready, the actual AES operation is surprisingly small. Go provides the cipher implementation through the standard library, while CBC mode determines how the individual blocks are chained together.'
			},
			{
				type: 'code',
				language: 'go',
				code: `func encrypt(iv, key, plaintext []byte) (ciphertext []byte, err error) {
	block, err := aes.NewCipher(key)

	if err != nil {
		return
	}

	mode := cipher.NewCBCEncrypter(block, iv)

	plaintext = pkcs7pad256(plaintext)
	ciphertext = make([]byte, len(plaintext))

	mode.CryptBlocks(ciphertext, plaintext)

	return
  }`
			},
			{
				type: 'paragraph',
				text: 'The result of CryptBlocks is binary data. It is not guaranteed to contain printable characters, which is why the ciphertext is normally encoded before being placed into a JSON response, database field, configuration value, or other text-based storage.'
			},
			{
				type: 'heading',
				level: 2,
				text: 'Making the ciphertext transportable'
			},
			{
				type: 'paragraph',
				text: 'The example combines the IV and ciphertext before encoding them with Base64. This gives the application one string that contains everything required to reconstruct the encrypted value, except for the secret key.'
			},
			{
				type: 'code',
				language: 'go',
				code: `ivcipher := append(iv, ciphertext...)

  cipherb64 := base64.StdEncoding.
	WithPadding(base64.NoPadding).
	EncodeToString(ivcipher)

  fmt.Printf("Ciphertext: %s\\n", cipherb64)`
			},
			{
				type: 'paragraph',
				text: 'This is an important distinction: Base64 is not encryption. Anyone who has the Base64 string can decode it back into the original binary bytes. The security comes from AES and, ultimately, from protecting the key.'
			},
			{
				type: 'heading',
				level: 2,
				text: 'Decryption is the reverse process'
			},
			{
				type: 'paragraph',
				text: 'Decryption reverses the same sequence. The application reconstructs the AES cipher from the key, creates a CBC decrypter using the IV, decrypts the ciphertext into padded plaintext, and finally removes the padding.'
			},
			{
				type: 'code',
				language: 'go',
				code: `func decrypt(iv, key, ciphertext []byte) (plaintext []byte, err error) {
	block, err := aes.NewCipher(key)

	if err != nil {
		return
	}

	mode := cipher.NewCBCDecrypter(block, iv)

	plaintext = make([]byte, len(ciphertext))
	mode.CryptBlocks(plaintext, ciphertext)

	return pkcs7strip256(plaintext)
  }`
			},
			{
				type: 'paragraph',
				text: 'The important property is that encryption and decryption must agree on the same key, IV, cipher mode, and padding scheme. Changing any of those details can make the ciphertext impossible to decrypt correctly.'
			},
			{
				type: 'heading',
				level: 2,
				text: 'Where this pattern can appear in a backend'
			},
			{
				type: 'paragraph',
				text: 'The same basic idea can appear in backend systems when an application needs application-level encryption for sensitive values. For example, a system could encrypt a value before storing it in a database and decrypt it only when the application genuinely needs the original value.'
			},
			{
				type: 'list',
				items: [
					'Encrypting selected sensitive database fields rather than storing their plaintext representation.',
					'Protecting application-level secrets that need to be recovered by the application later.',
					'Encrypting data exchanged between application components when an additional application-level protection layer is required.',
					'Learning how cryptographic primitives fit together before using higher-level encryption libraries or services.'
				]
			},
			{
				type: 'paragraph',
				text: 'This is different from password hashing. A password normally should not be encrypted so that the application can decrypt it later. Passwords are generally stored using a password hashing algorithm designed for that purpose. Encryption is appropriate for data that the application legitimately needs to recover.'
			},
			{
				type: 'heading',
				level: 2,
				text: 'What I learned from implementing it'
			},
			{
				type: 'paragraph',
				text: 'The biggest lesson was that encryption is not just calling AES. There are several decisions around it: how the key is created and stored, how the IV is generated, how plaintext is padded, how ciphertext is represented, and how the application detects invalid or corrupted data.'
			},
			{
				type: 'paragraph',
				text: 'It also made the difference between encoding and encryption much clearer. Hex and Base64 are representations of bytes. They make binary data easier to display or transport, but neither one provides confidentiality. AES is the part that provides encryption, while the key is the secret that controls who can decrypt the result.'
			},
			{
				type: 'heading',
				level: 2,
				text: 'CBC is not the whole security story'
			},
			{
				type: 'paragraph',
				text: 'The example is useful for understanding AES-CBC, but understanding an algorithm is different from designing a production cryptosystem. CBC by itself does not provide authenticated integrity. An attacker may be able to modify ciphertext without the recipient having a reliable way to know that the plaintext was tampered with.'
			},
			{
				type: 'paragraph',
				text: 'For a new production system, I would not treat this small example as a drop-in encryption library. An authenticated encryption mode such as AES-GCM is usually a better starting point because confidentiality and integrity are handled together. Key management also needs to be designed separately from the encryption function itself.'
			},
			{
				type: 'heading',
				level: 2,
				text: 'The part worth remembering'
			},
			{
				type: 'paragraph',
				text: 'The code is small, but the concepts behind it are useful far beyond this example. A plaintext becomes bytes, a key determines the encryption operation, an IV provides the required initialization input for CBC, padding makes the message block-aligned, AES transforms the data into ciphertext, and Base64 gives that binary result a convenient textual representation.'
			},
			{
				type: 'paragraph',
				text: 'I started this example because I wanted to stop treating encryption as a black box. The useful result was not just getting a ciphertext string back. It was understanding what each piece of the process is responsible for, and where a simple learning implementation stops being enough for a real backend system.'
			}
		]
	}
];

const WORDS_PER_MINUTE = 210;

function blockText(block: PostBlock): string {
	switch (block.type) {
		case 'paragraph':
		case 'heading':
			return block.text;
		case 'quote':
			return `${block.text} ${block.cite ?? ''}`;
		case 'list':
			return block.items.join(' ');
		case 'code':
			return block.code;
	}
}

export function wordCount(post: Post): number {
	return post.content.map(blockText).join(' ').trim().split(/\s+/).filter(Boolean).length;
}

export function readingTime(post: Post): number {
	return Math.max(1, Math.round(wordCount(post) / WORDS_PER_MINUTE));
}

export function slugify(value: string): string {
	return value
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * Fecha numérica para el índice: alineada, del mismo ancho en todas las filas y
 * ordenable a ojo. En una lista, `2026.08.06` se compara de un vistazo con la
 * de abajo; `Aug 6, 2026` no.
 */
export function formatDateIndex(date: string): string {
	return date.replaceAll('-', '.');
}

export function formatDate(date: string): string {
	return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC'
	});
}

export function toSummary(post: Post): PostSummary {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { content, ...meta } = post;
	return { ...meta, readingTime: readingTime(post) };
}

function byDateDesc(a: Post, b: Post): number {
	return b.date.localeCompare(a.date);
}

export function getPosts(): Post[] {
	return [...posts].sort(byDateDesc);
}

export function getSummaries(): PostSummary[] {
	return getPosts().map(toSummary);
}

export function getPost(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}

export function getTags(): string[] {
	return [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
}

export function getSiblings(slug: string): {
	previous: PostSummary | null;
	next: PostSummary | null;
} {
	const sorted = getPosts();
	const index = sorted.findIndex((post) => post.slug === slug);

	return {
		previous: index > 0 ? toSummary(sorted[index - 1]) : null,
		next: index >= 0 && index < sorted.length - 1 ? toSummary(sorted[index + 1]) : null
	};
}

export { posts };
