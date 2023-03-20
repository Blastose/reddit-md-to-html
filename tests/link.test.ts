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

	test('url by itself after other links', () => {
		const text = `**Panther**  
**Github**: [https://github.com/AliRn76/panther](https://github.com/AliRn76/panther)  
**Documentation**: [https://pantherpy.github.io/](https://pantherpy.github.io/)  


https://preview.redd.it/gtec70b1uroa1.png?width=831&format=png&auto=webp&v=enabled&s=08c1d9b71f3f555297432cc817dfa09d05c67c66`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<p><strong>Panther</strong><br><strong>Github</strong>: <a href="https://github.com/AliRn76/panther">https://github.com/AliRn76/panther</a><br><strong>Documentation</strong>: <a href="https://pantherpy.github.io/">https://pantherpy.github.io/</a>  </p><p><a href="https://preview.redd.it/gtec70b1uroa1.png?width=831&amp;format=png&amp;auto=webp&amp;v=enabled&amp;s=08c1d9b71f3f555297432cc817dfa09d05c67c66">https://preview.redd.it/gtec70b1uroa1.png?width=831&amp;format=png&amp;auto=webp&amp;v=enabled&amp;s=08c1d9b71f3f555297432cc817dfa09d05c67c66</a></p>`
		);
	});

	// Fails on [Very little]; cannot handle [] without a second []
	test.fails('reference link', () => {
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

describe('url', () => {
	test('normal url', () => {
		const htmlResult = converter(`https://www.twitter.com/simdf/1329853254`);
		expect(htmlResult).toBe(
			'<p><a href="https://www.twitter.com/simdf/1329853254">https://www.twitter.com/simdf/1329853254</a></p>'
		);
	});

	test('normal url with text surrounding', () => {
		const htmlResult = converter(`Click this https://www.twitter.com/simdf/1329853254 to get`);
		expect(htmlResult).toBe(
			'<p>Click this <a href="https://www.twitter.com/simdf/1329853254">https://www.twitter.com/simdf/1329853254</a> to get</p>'
		);
	});

	test('url with backslashes before underscores', () => {
		const htmlResult = converter(String.raw`https://www.twitter.com/simdf\_sdjlkj/1329853254`);
		expect(htmlResult).toBe(
			'<p><a href="https://www.twitter.com/simdf_sdjlkj/1329853254">https://www.twitter.com/simdf_sdjlkj/1329853254</a></p>'
		);
	});

	test('url with backslashes before underscores and text surrounding', () => {
		const htmlResult = converter(
			String.raw`See https://www.reddit.com/r/bugs/comments/nwv50z/old\_reddit\_users\_see\_thousands\_of\_broken\_links/`
		);
		expect(htmlResult).toBe(
			'<p>See <a href="https://www.reddit.com/r/bugs/comments/nwv50z/old_reddit_users_see_thousands_of_broken_links/">https://www.reddit.com/r/bugs/comments/nwv50z/old_reddit_users_see_thousands_of_broken_links/</a></p>'
		);
	});
});
