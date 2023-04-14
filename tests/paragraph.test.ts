import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('paragraph', () => {
	test('normal paragraph', () => {
		const text = `Far out sun.

Orbiting this is
a pretty neat idea.

This planet is odd because`;
		const htmlResult = converter(text);

		expect(htmlResult).toBe(`<p>Far out sun.</p><p>Orbiting this is
a pretty neat idea.</p><p>This planet is odd because</p>`);
	});

	test('text with &#x200B; breaks', () => {
		const text = `Far out sun.

&#x200b;

Orbiting this is
a pretty neat idea.

&#x200B;

This planet is odd because`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(`<p>Far out sun.</p><p>&#x200b;</p><p>Orbiting this is
a pretty neat idea.</p><p>&#x200B;</p><p>This planet is odd because</p>`);
	});

	test('text with &nbsp; breaks', () => {
		const text = `Far out sun.

&nbsp;

Orbiting this is
a pretty neat idea.

&nbsp;

This planet is odd because`;

		const htmlResult = converter(text);

		expect(htmlResult).toBe(`<p>Far out sun.</p><p>&nbsp;</p><p>Orbiting this is
a pretty neat idea.</p><p>&nbsp;</p><p>This planet is odd because</p>`);
	});

	test('text with backslash br and &nbsp; breaks', () => {
		const text = String.raw`Be empty of worrying.\
Think of who created thought!

&nbsp;

Why do you stay in prison\
When the door is so wide open?`;

		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			`<p>Be empty of worrying.<br>Think of who created thought!</p><p>&nbsp;</p><p>Why do you stay in prison<br>When the door is so wide open?</p>`
		);
	});

	test('inline &nbsp;', () => {
		const text = 'A&nbsp;&nbsp;&nbsp;&nbsp;a a b';
		const htmlResult = converter(text);
		expect(htmlResult).toBe('<p>A&nbsp;&nbsp;&nbsp;&nbsp;a a b</p>');
	});

	test('inline &#x200b;', () => {
		const text = 'A&#x200b;&#x200b;&#x200b;&#x200b;a a b';
		const htmlResult = converter(text);
		expect(htmlResult).toBe('<p>A&#x200b;&#x200b;&#x200b;&#x200b;a a b</p>');
	});

	test('superscript with &#32; spaces', () => {
		const text =
			'^{anime},&#32;<manga>,&#32;]LN[,&#32;|VN|&#32;|&#32;[FAQ](http://www.reddit.com/r/Roboragi/wiki/index)&#32;|&#32;[/r/](http://www.reddit.com/r/Roboragi/)&#32;|&#32;[Edit](https://www.reddit.com/r/Roboragi/wiki/index#wiki_i_made_a_mistake.2C_how_do_i_get_my_comment_reprocessed.3F)&#32;|&#32;[Mistake?](http://www.reddit.com/r/Roboragi/submit?selftext=true&title=[ISSUE]&text=/r/manga/comments/kl85b3/what_manga_have_you_read_this_week_and_what_do/ghe3ssl/)&#32;|&#32;[Source](https://github.com/Nihilate/Roboragi)&#32;|&#32;[Synonyms](https://www.reddit.com/r/Roboragi/wiki/synonyms)&#32;|&#32;[⛓](https://www.reddit.com/r/Roboragi/wiki/interestinglinks)&#32;|&#32;[♥](https://www.reddit.com/r/Roboragi/wiki/thanks)';
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p><sup>{anime},&#32;&lt;manga&gt;,&#32;]LN[,&#32;|VN|&#32;|&#32;<a href="http://www.reddit.com/r/Roboragi/wiki/index" rel="noopener nofollow ugc">FAQ</a>&#32;|&#32;<a href="http://www.reddit.com/r/Roboragi/" rel="noopener nofollow ugc">/r/</a>&#32;|&#32;<a href="https://www.reddit.com/r/Roboragi/wiki/index#wiki_i_made_a_mistake.2C_how_do_i_get_my_comment_reprocessed.3F" rel="noopener nofollow ugc">Edit</a>&#32;|&#32;<a href="http://www.reddit.com/r/Roboragi/submit?selftext=true&amp;title=[ISSUE]&amp;text=/r/manga/comments/kl85b3/what_manga_have_you_read_this_week_and_what_do/ghe3ssl/" rel="noopener nofollow ugc">Mistake?</a>&#32;|&#32;<a href="https://github.com/Nihilate/Roboragi" rel="noopener nofollow ugc">Source</a>&#32;|&#32;<a href="https://www.reddit.com/r/Roboragi/wiki/synonyms" rel="noopener nofollow ugc">Synonyms</a>&#32;|&#32;<a href="https://www.reddit.com/r/Roboragi/wiki/interestinglinks" rel="noopener nofollow ugc">⛓</a>&#32;|&#32;<a href="https://www.reddit.com/r/Roboragi/wiki/thanks" rel="noopener nofollow ugc">♥</a></sup></p>'
		);
	});

	test('html entities', () => {
		const text = `It’s an HTML entity, so realistically it falls to Apollo to render it, but at the same time there’s little reason for Apollo to actually need to. 

We can test if it renders other HTML entities though… &lt; &#169; (should show up as a less than and a copyright symbol, if they’re rendered properly). I’m not expecting them to, though they’ll probably show fine on web.`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p>It’s an HTML entity, so realistically it falls to Apollo to render it, but at the same time there’s little reason for Apollo to actually need to. </p><p>We can test if it renders other HTML entities though… &lt; &#169; (should show up as a less than and a copyright symbol, if they’re rendered properly). I’m not expecting them to, though they’ll probably show fine on web.</p>'
		);
	});

	test('escapes possible XXS attack in html entities', () => {
		const text = `<img src=a onerror='alert();'>
		
&<img src=a onerror='alert();'>;`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p>&lt;img src=a onerror=&#x27;alert();&#x27;&gt;</p><p>&amp;&lt;img src=a onerror=&#x27;alert();&#x27;&gt;;</p>'
		);
	});
});
