import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('link', () => {
	test('normal link', () => {
		const text = `[ice creams](https://www.google.com) I love ice creams`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p><a href="https://www.google.com" rel="noopener nofollow ugc">ice creams</a> I love ice creams</p>'
		);
	});

	test('link with autolink in []', () => {
		const text = `[https://www.google.com](https://www.google.com) is a website`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p><a href="https://www.google.com" rel="noopener nofollow ugc">https://www.google.com</a> is a website</p>'
		);
	});

	test('link wrapped with <>', () => {
		const htmlResult = converter('<http://example.com/foo/../bar..>');
		expect(htmlResult).toBe(
			'<p><a href="http://example.com/foo/../bar.." rel="noopener nofollow ugc">http://example.com/foo/../bar..</a></p>'
		);
	});

	test('link with arbitrary text', () => {
		const htmlResult = converter('[Rumi](https://en.wikipedia.org/wiki/Rumi)');
		expect(htmlResult).toBe(
			'<p><a href="https://en.wikipedia.org/wiki/Rumi" rel="noopener nofollow ugc">Rumi</a></p>'
		);
	});

	test('link with arbitrary text and title surrounded by quotes', () => {
		const htmlResult = converter(
			'[Zappa](https://en.wikipedia.org/wiki/Frank_Zappa "Frank Zappa - Wikipedia")'
		);
		expect(htmlResult).toBe(
			'<p><a href="https://en.wikipedia.org/wiki/Frank_Zappa" title="Frank Zappa - Wikipedia" rel="noopener nofollow ugc">Zappa</a></p>'
		);
	});

	test('link with arbitrary text and title surrounded by quotes', () => {
		const htmlResult = converter(
			'[Zappa](https://en.wikipedia.org/wiki/Frank_Zappa "Frank Zappa - Wikipedia")'
		);
		expect(htmlResult).toBe(
			'<p><a href="https://en.wikipedia.org/wiki/Frank_Zappa" title="Frank Zappa - Wikipedia" rel="noopener nofollow ugc">Zappa</a></p>'
		);
	});

	test('link with arbitrary text and title surrounded by single quotes', () => {
		const htmlResult = converter(
			"[Gandhi](https://en.wikipedia.org/wiki/Mahatma_Gandhi 'Mahatma Gandhi - Wikipedia')"
		);
		expect(htmlResult).toBe(
			'<p><a href="https://en.wikipedia.org/wiki/Mahatma_Gandhi" title="Mahatma Gandhi - Wikipedia" rel="noopener nofollow ugc">Gandhi</a></p>'
		);
	});

	test('link with arbitrary text and title surrounded by parentheses', () => {
		const htmlResult = converter(
			'[Twain](https://en.wikipedia.org/wiki/Mark_Twain (Mark Twain - Wikipedia))'
		);
		expect(htmlResult).toBe(
			'<p><a href="https://en.wikipedia.org/wiki/Mark_Twain" title="Mark Twain - Wikipedia" rel="noopener nofollow ugc">Twain</a></p>'
		);
	});

	test('url by itself after other links', () => {
		const text = `**Panther**  
**Github**: [https://github.com/AliRn76/panther](https://github.com/AliRn76/panther)  
**Documentation**: [https://pantherpy.github.io/](https://pantherpy.github.io/)  


https://preview.redd.it/gtec70b1uroa1.png?width=831&format=png&auto=webp&v=enabled&s=08c1d9b71f3f555297432cc817dfa09d05c67c66`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<p><strong>Panther</strong><br><strong>Github</strong>: <a href="https://github.com/AliRn76/panther" rel="noopener nofollow ugc">https://github.com/AliRn76/panther</a><br><strong>Documentation</strong>: <a href="https://pantherpy.github.io/" rel="noopener nofollow ugc">https://pantherpy.github.io/</a>  </p><p><a href="https://preview.redd.it/gtec70b1uroa1.png?width=831&amp;format=png&amp;auto=webp&amp;v=enabled&amp;s=08c1d9b71f3f555297432cc817dfa09d05c67c66" rel="noopener nofollow ugc">https://preview.redd.it/gtec70b1uroa1.png?width=831&amp;format=png&amp;auto=webp&amp;v=enabled&amp;s=08c1d9b71f3f555297432cc817dfa09d05c67c66</a></p>`
		);
	});
});

describe('url', () => {
	test('normal url', () => {
		const htmlResult = converter(`https://www.twitter.com/simdf/1329853254`);
		expect(htmlResult).toBe(
			'<p><a href="https://www.twitter.com/simdf/1329853254" rel="noopener nofollow ugc">https://www.twitter.com/simdf/1329853254</a></p>'
		);
	});

	test('normal url with text surrounding', () => {
		const htmlResult = converter(`Click this https://www.twitter.com/simdf/1329853254 to get`);
		expect(htmlResult).toBe(
			'<p>Click this <a href="https://www.twitter.com/simdf/1329853254" rel="noopener nofollow ugc">https://www.twitter.com/simdf/1329853254</a> to get</p>'
		);
	});

	test('url with backslashes before underscores', () => {
		const htmlResult = converter(String.raw`https://www.twitter.com/simdf\_sdjlkj/1329853254`);
		expect(htmlResult).toBe(
			'<p><a href="https://www.twitter.com/simdf_sdjlkj/1329853254" rel="noopener nofollow ugc">https://www.twitter.com/simdf_sdjlkj/1329853254</a></p>'
		);
	});

	test('url with backslashes before underscores and text surrounding', () => {
		const htmlResult = converter(
			String.raw`See https://www.reddit.com/r/bugs/comments/nwv50z/old\_reddit\_users\_see\_thousands\_of\_broken\_links/`
		);
		expect(htmlResult).toBe(
			'<p>See <a href="https://www.reddit.com/r/bugs/comments/nwv50z/old_reddit_users_see_thousands_of_broken_links/" rel="noopener nofollow ugc">https://www.reddit.com/r/bugs/comments/nwv50z/old_reddit_users_see_thousands_of_broken_links/</a></p>'
		);
	});

	test('url with www. link only', () => {
		const htmlResult = converter('www.google.ca');
		expect(htmlResult).toBe(
			'<p><a href="https://www.google.ca" rel="noopener nofollow ugc">www.google.ca</a></p>'
		);
	});

	test('url starting with www.', () => {
		const htmlResult = converter('Visit www.google.ca for more info');
		expect(htmlResult).toBe(
			'<p>Visit <a href="https://www.google.ca" rel="noopener nofollow ugc">www.google.ca</a> for more info</p>'
		);
	});

	test('does not match url not starting with www.', () => {
		const htmlResult = converter('Visit old.reddit.com for more info');
		expect(htmlResult).toBe('<p>Visit old.reddit.com for more info</p>');
	});

	test('url with spaces in (link) part', () => {
		const htmlResult = converter(
			'[ [False Negative](https://www.reddit.com/message/compose/?to=RepostSleuthBot&subject=False%20Negative&message={"post_id": "12f19cn", "meme_template": 6358}) ]'
		);

		expect(htmlResult).toBe(
			'<p>[ <a href="https://www.reddit.com/message/compose/?to=RepostSleuthBot&amp;subject=False%20Negative&amp;message={&quot;post_id&quot;: &quot;12f19cn&quot;, &quot;meme_template&quot;: 6358}" rel="noopener nofollow ugc">False Negative</a> ]</p>'
		);
	});

	test('url with )? at end that does not get matched', () => {
		const htmlResult = converter(
			'https://reddit.com/r/redditdev/comments/s4b60c/how_can_i_get_a_video_url_from_the_reddit_api/)?'
		);
		expect(htmlResult).toBe(
			'<p><a href="https://reddit.com/r/redditdev/comments/s4b60c/how_can_i_get_a_video_url_from_the_reddit_api/" rel="noopener nofollow ugc">https://reddit.com/r/redditdev/comments/s4b60c/how_can_i_get_a_video_url_from_the_reddit_api/</a>)?</p>'
		);
	});

	test('url with unmatched trailing parentheses', () => {
		const htmlResult = converter('www.google.com/search?q=Markup+(business)))');
		expect(htmlResult).toBe(
			'<p><a href="https://www.google.com/search?q=Markup+(business)" rel="noopener nofollow ugc">www.google.com/search?q=Markup+(business)</a>))</p>'
		);
	});
});

describe('url but []() are [link](text)', () => {
	test('[link](text) gets converted to <a>link</a>', () => {
		const text = `I found an old post that gives some [https://www.reddit.com/r/apolloapp/comments/m19oi0/apollo_app_taking_up_unreasonable_amount_of_space/?utm_source=share&utm_medium=ios_app&utm_name=ioscss&utm_content=1&utm_term=1](clues here.)`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p>I found an old post that gives some <a href="https://www.reddit.com/r/apolloapp/comments/m19oi0/apollo_app_taking_up_unreasonable_amount_of_space/?utm_source=share&amp;utm_medium=ios_app&amp;utm_name=ioscss&amp;utm_content=1&amp;utm_term=1" rel="noopener nofollow ugc">https://www.reddit.com/r/apolloapp/comments/m19oi0/apollo_app_taking_up_unreasonable_amount_of_space/?utm_source=share&amp;utm_medium=ios_app&amp;utm_name=ioscss&amp;utm_content=1&amp;utm_term=1</a></p>'
		);
	});
});
