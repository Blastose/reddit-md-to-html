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

	test('reflink does not convert when [link]: is not found ', () => {
		const text =
			"I miss bbcode formatting. Something simple and easy to remember for formatting that you can't screw up or accidentally cause. To quote was simply [quote] [/quote] spoiler is [spoiler] [/spoiler]. It was easy to understand and use. No dumb symbol use where you may accidentally invoke or whatever.";
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p>I miss bbcode formatting. Something simple and easy to remember for formatting that you can&#x27;t screw up or accidentally cause. To quote was simply [quote] [/quote] spoiler is [spoiler] [/spoiler]. It was easy to understand and use. No dumb symbol use where you may accidentally invoke or whatever.</p>'
		);
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
