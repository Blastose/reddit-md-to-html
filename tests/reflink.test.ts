import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('reflink', () => {
	test('reflink not matching when link []() after', () => {
		const text = `[L] [DiddyKong](#U-DiddyKong) Tweek`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p>[L] <a href="#U-DiddyKong" rel="noopener nofollow ugc">DiddyKong</a> Tweek</p>'
		);
	});

	test('normal reflink', () => {
		const text = `[Very little][wot] is needed to make a happy life;
it is all within yourself, in your [way of thinking][wot].

[Very little]: https://www.reddit.com/r/Meditation/
[wot]: https://www.reddit.com/r/ChangeMyView/`;

		const htmlResult = converter(text);
		expect(htmlResult)
			.toBe(`<p><a href="https://www.reddit.com/r/ChangeMyView/" rel="noopener nofollow ugc">Very little</a> is needed to make a happy life;
it is all within yourself, in your <a href="https://www.reddit.com/r/ChangeMyView/" rel="noopener nofollow ugc">way of thinking</a>.</p>`);
	});

	test('does not convert []', () => {
		const text = `[Very little]`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe('<p>[Very little]</p>');
	});

	// Fails on [Very little]; cannot handle [] without a second []
	test.fails('reference link', () => {
		const text = `[Very little] is needed to make a happy life;
it is all within yourself, in your [way of thinking][wot].

[Very little]: https://www.reddit.com/r/Meditation/
[wot]: https://www.reddit.com/r/ChangeMyView/`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<p><a href="https://www.reddit.com/r/Meditation/" rel="noopener nofollow ugc">Very little</a> is needed to make a happy life;
it is all within yourself, in your <a href="https://www.reddit.com/r/ChangeMyView/" rel="noopener nofollow ugc">way of thinking</a>.</p>`
		);
	});
});
