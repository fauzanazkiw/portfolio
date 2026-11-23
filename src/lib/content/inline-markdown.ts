const RULES = [
	{ pattern: /\[([^\]]+)\]\(([^)]+)\)/g, plain: '$1', html: '<a href="$2">$1</a>' },
	{ pattern: /\*\*([^*]+)\*\*/g, plain: '$1', html: '<strong>$1</strong>' },
	{ pattern: /`([^`]+)`/g, plain: '$1', html: '<code>$1</code>' },
	{ pattern: /\*([^*]+)\*/g, plain: '$1', html: '<em>$1</em>' }
];

export const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;

export function plainText(text: string): string {
	return RULES.reduce((value, rule) => value.replace(rule.pattern, rule.plain), text)
		.replace(/\s+/g, ' ')
		.trim();
}

export function inlineHtml(escaped: string): string {
	return RULES.reduce((value, rule) => value.replace(rule.pattern, rule.html), escaped);
}
