import { browser } from '$app/environment';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (browser) {
	gsap.registerPlugin(ScrollTrigger, SplitText);
}

export function prefersReducedMotion() {
	return browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function prefersFinePointer() {
	return browser && window.matchMedia('(pointer: fine)').matches;
}

export const DEFAULT_REVEAL_START = 'top 85%';

export function withScrollContext(el: Element, setup: () => void): () => void {
	const ctx = gsap.context(setup, el);
	return () => ctx.revert();
}

export { gsap, ScrollTrigger, SplitText };

export function createQuickSetter<P extends string>(
	el: Element,
	props: P[],
	vars: gsap.TweenVars
): (values: Partial<Record<P, number>>) => void {
	const setters = Object.fromEntries(
		props.map((prop) => [prop, gsap.quickTo(el, prop, vars)])
	) as unknown as Record<P, (value: number) => void>;

	return (values) => {
		for (const prop in values) {
			const value = values[prop];
			if (value !== undefined) setters[prop](value);
		}
	};
}
