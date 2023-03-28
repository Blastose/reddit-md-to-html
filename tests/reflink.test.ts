import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('reflink', () => {
	test('reflink not matching when link after', () => {
		const text = `[L] [DiddyKong](#U-DiddyKong) Tweek`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p>[L] <a href="#U-DiddyKong" rel="noopener nofollow ugc">DiddyKong</a> Tweek</p>'
		);
	});
});
