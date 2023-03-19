import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('link', () => {
	test('normal link', () => {
		const text = `[ice creams](https://www.google.com) I love ice creams`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p><a href="https://www.google.com">ice creams</a> I love ice creams</p>'
		);
	});

	test('link with autolink in []', () => {
		const text = `[https://www.google.com](https://www.google.com) is a website`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p><a href="https://www.google.com">https://www.google.com</a> is a website</p>'
		);
	});

	test('link wrapped with <>', () => {
		const htmlResult = converter('<http://example.com/foo/../bar..>');
		expect(htmlResult).toBe(
			'<p><a href="http://example.com/foo/../bar..">http://example.com/foo/../bar..</a></p>'
		);
	});

	test('link with arbitrary text', () => {
		const htmlResult = converter('[Rumi](https://en.wikipedia.org/wiki/Rumi)');
		expect(htmlResult).toBe('<p><a href="https://en.wikipedia.org/wiki/Rumi">Rumi</a></p>');
	});

	test('link with arbitrary text and title surrounded by quotes', () => {
		const htmlResult = converter(
			'[Zappa](https://en.wikipedia.org/wiki/Frank_Zappa "Frank Zappa - Wikipedia")'
		);
		expect(htmlResult).toBe(
			'<p><a href="https://en.wikipedia.org/wiki/Frank_Zappa" title="Frank Zappa - Wikipedia">Zappa</a></p>'
		);
	});

	test('link with arbitrary text and title surrounded by quotes', () => {
		const htmlResult = converter(
			'[Zappa](https://en.wikipedia.org/wiki/Frank_Zappa "Frank Zappa - Wikipedia")'
		);
		expect(htmlResult).toBe(
			'<p><a href="https://en.wikipedia.org/wiki/Frank_Zappa" title="Frank Zappa - Wikipedia">Zappa</a></p>'
		);
	});

	test('link with arbitrary text and title surrounded by single quotes', () => {
		const htmlResult = converter(
			"[Gandhi](https://en.wikipedia.org/wiki/Mahatma_Gandhi 'Mahatma Gandhi - Wikipedia')"
		);
		expect(htmlResult).toBe(
			'<p><a href="https://en.wikipedia.org/wiki/Mahatma_Gandhi" title="Mahatma Gandhi - Wikipedia">Gandhi</a></p>'
		);
	});

	// Fails on [Very little]; cannot handle [] without a second []
	test('reference link', () => {
		const text = `[Very little] is needed to make a happy life;
it is all within yourself, in your [way of thinking][wot].

[Very little]: https://www.reddit.com/r/Meditation/
[wot]: https://www.reddit.com/r/ChangeMyView/`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<p><a href="https://www.reddit.com/r/Meditation/">Very little</a> is needed to make a happy life;
it is all within yourself, in your <a href="https://www.reddit.com/r/ChangeMyView/">way of thinking</a>.</p>`
		);
	});
});
