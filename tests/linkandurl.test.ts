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

	test('long link with several parentheses', () => {
		const text = `[https://godbolt.org/#g:!((g:!((g:!((h:codeEditor,i:(filename:'1',fontScale:14,fontUsePx:'0',j:1,lang:c%2B%2B,selection:(endColumn:2,endLineNumber:4,positionColumn:2,positionLineNumber:4,selectionStartColumn:2,selectionStartLineNumber:4,startColumn:2,startLineNumber:4),source:'int+main()+%7B%0A++++constexpr+int+v1+%3D+1ul+%3C%3C+10+%3C%3C+60%3B%0A++++constexpr+int+v2+%3D+1ul+%3C%3C+(10+%2B+60)%3B%0A%7D'),l:'5',n:'0',o:'C%2B%2B+source+%231',t:'0')),k:66.25091709464417,l:'4',n:'0',o:'',s:0,t:'0'),(g:!((g:!((h:output,i:(editorid:1,fontScale:14,fontUsePx:'0',j:1,wrap:'1'),l:'5',n:'0',o:'Output+of+x86-64+gcc+13.1+(Compiler+%231)',t:'0')),k:16.9736458377345,l:'4',m:50,n:'0',o:'',s:0,t:'0'),(g:!((h:compiler,i:(compiler:g131,deviceViewOpen:'1',filters:(b:'0',binary:'0',binaryObject:'1',commentOnly:'0',demangle:'0',directives:'0',execute:'0',intel:'0',libraryCode:'0',trim:'1'),flagsViewOpen:'1',fontScale:14,fontUsePx:'0',j:1,lang:c%2B%2B,libs:!(),options:'',selection:(endColumn:1,endLineNumber:1,positionColumn:1,positionLineNumber:1,selectionStartColumn:1,selectionStartLineNumber:1,startColumn:1,startLineNumber:1),source:1),l:'5',n:'0',o:'+x86-64+gcc+13.1+(Editor+%231)',t:'0')),header:(),l:'4',m:50,n:'0',o:'',s:0,t:'0')),k:33.749082905355834,l:'3',n:'0',o:'',t:'0')),l:'2',n:'0',o:'',t:'0')),version:4](https://godbolt.org/#g:!((g:!((g:!((h:codeEditor,i:(filename:'1',fontScale:14,fontUsePx:'0',j:1,lang:c%2B%2B,selection:(endColumn:2,endLineNumber:4,positionColumn:2,positionLineNumber:4,selectionStartColumn:2,selectionStartLineNumber:4,startColumn:2,startLineNumber:4),source:'int+main()+%7B%0A++++constexpr+int+v1+%3D+1ul+%3C%3C+10+%3C%3C+60%3B%0A++++constexpr+int+v2+%3D+1ul+%3C%3C+(10+%2B+60)%3B%0A%7D'),l:'5',n:'0',o:'C%2B%2B+source+%231',t:'0')),k:66.25091709464417,l:'4',n:'0',o:'',s:0,t:'0'),(g:!((g:!((h:output,i:(editorid:1,fontScale:14,fontUsePx:'0',j:1,wrap:'1'),l:'5',n:'0',o:'Output+of+x86-64+gcc+13.1+(Compiler+%231)',t:'0')),k:16.9736458377345,l:'4',m:50,n:'0',o:'',s:0,t:'0'),(g:!((h:compiler,i:(compiler:g131,deviceViewOpen:'1',filters:(b:'0',binary:'0',binaryObject:'1',commentOnly:'0',demangle:'0',directives:'0',execute:'0',intel:'0',libraryCode:'0',trim:'1'),flagsViewOpen:'1',fontScale:14,fontUsePx:'0',j:1,lang:c%2B%2B,libs:!(),options:'',selection:(endColumn:1,endLineNumber:1,positionColumn:1,positionLineNumber:1,selectionStartColumn:1,selectionStartLineNumber:1,startColumn:1,startLineNumber:1),source:1),l:'5',n:'0',o:'+x86-64+gcc+13.1+(Editor+%231)',t:'0')),header:(),l:'4',m:50,n:'0',o:'',s:0,t:'0')),k:33.749082905355834,l:'3',n:'0',o:'',t:'0')),l:'2',n:'0',o:'',t:'0')),version:4)`;
		const htmlResult = converter(text);
		// matches old reddit output, but new reddit matches the entire link instead of stopping at the first )
		expect(htmlResult).toBe(
			'<p><a href="https://godbolt.org/#g:!((g:!((g:!((h:codeEditor,i:(filename:&#x27;1&#x27;,fontScale:14,fontUsePx:&#x27;0&#x27;,j:1,lang:c%2B%2B,selection:(endColumn:2,endLineNumber:4,positionColumn:2,positionLineNumber:4,selectionStartColumn:2,selectionStartLineNumber:4,startColumn:2,startLineNumber:4),source:&#x27;int+main()+%7B%0A++++constexpr+int+v1+%3D+1ul+%3C%3C+10+%3C%3C+60%3B%0A++++constexpr+int+v2+%3D+1ul+%3C%3C+(10+%2B+60)%3B%0A%7D&#x27;" rel="noopener nofollow ugc">https://godbolt.org/#g:!((g:!((g:!((h:codeEditor,i:(filename:&#x27;1&#x27;,fontScale:14,fontUsePx:&#x27;0&#x27;,j:1,lang:c%2B%2B,selection:(endColumn:2,endLineNumber:4,positionColumn:2,positionLineNumber:4,selectionStartColumn:2,selectionStartLineNumber:4,startColumn:2,startLineNumber:4),source:&#x27;int+main()+%7B%0A++++constexpr+int+v1+%3D+1ul+%3C%3C+10+%3C%3C+60%3B%0A++++constexpr+int+v2+%3D+1ul+%3C%3C+(10+%2B+60)%3B%0A%7D&#x27;),l:&#x27;5&#x27;,n:&#x27;0&#x27;,o:&#x27;C%2B%2B+source+%231&#x27;,t:&#x27;0&#x27;)),k:66.25091709464417,l:&#x27;4&#x27;,n:&#x27;0&#x27;,o:&#x27;&#x27;,s:0,t:&#x27;0&#x27;),(g:!((g:!((h:output,i:(editorid:1,fontScale:14,fontUsePx:&#x27;0&#x27;,j:1,wrap:&#x27;1&#x27;),l:&#x27;5&#x27;,n:&#x27;0&#x27;,o:&#x27;Output+of+x86-64+gcc+13.1+(Compiler+%231)&#x27;,t:&#x27;0&#x27;)),k:16.9736458377345,l:&#x27;4&#x27;,m:50,n:&#x27;0&#x27;,o:&#x27;&#x27;,s:0,t:&#x27;0&#x27;),(g:!((h:compiler,i:(compiler:g131,deviceViewOpen:&#x27;1&#x27;,filters:(b:&#x27;0&#x27;,binary:&#x27;0&#x27;,binaryObject:&#x27;1&#x27;,commentOnly:&#x27;0&#x27;,demangle:&#x27;0&#x27;,directives:&#x27;0&#x27;,execute:&#x27;0&#x27;,intel:&#x27;0&#x27;,libraryCode:&#x27;0&#x27;,trim:&#x27;1&#x27;),flagsViewOpen:&#x27;1&#x27;,fontScale:14,fontUsePx:&#x27;0&#x27;,j:1,lang:c%2B%2B,libs:!(),options:&#x27;&#x27;,selection:(endColumn:1,endLineNumber:1,positionColumn:1,positionLineNumber:1,selectionStartColumn:1,selectionStartLineNumber:1,startColumn:1,startLineNumber:1),source:1),l:&#x27;5&#x27;,n:&#x27;0&#x27;,o:&#x27;+x86-64+gcc+13.1+(Editor+%231)&#x27;,t:&#x27;0&#x27;)),header:(),l:&#x27;4&#x27;,m:50,n:&#x27;0&#x27;,o:&#x27;&#x27;,s:0,t:&#x27;0&#x27;)),k:33.749082905355834,l:&#x27;3&#x27;,n:&#x27;0&#x27;,o:&#x27;&#x27;,t:&#x27;0&#x27;)),l:&#x27;2&#x27;,n:&#x27;0&#x27;,o:&#x27;&#x27;,t:&#x27;0&#x27;)),version:4</a>,l:&#x27;5&#x27;,n:&#x27;0&#x27;,o:&#x27;C%2B%2B+source+%231&#x27;,t:&#x27;0&#x27;)),k:66.25091709464417,l:&#x27;4&#x27;,n:&#x27;0&#x27;,o:&#x27;&#x27;,s:0,t:&#x27;0&#x27;),(g:!((g:!((h:output,i:(editorid:1,fontScale:14,fontUsePx:&#x27;0&#x27;,j:1,wrap:&#x27;1&#x27;),l:&#x27;5&#x27;,n:&#x27;0&#x27;,o:&#x27;Output+of+x86-64+gcc+13.1+(Compiler+%231)&#x27;,t:&#x27;0&#x27;)),k:16.9736458377345,l:&#x27;4&#x27;,m:50,n:&#x27;0&#x27;,o:&#x27;&#x27;,s:0,t:&#x27;0&#x27;),(g:!((h:compiler,i:(compiler:g131,deviceViewOpen:&#x27;1&#x27;,filters:(b:&#x27;0&#x27;,binary:&#x27;0&#x27;,binaryObject:&#x27;1&#x27;,commentOnly:&#x27;0&#x27;,demangle:&#x27;0&#x27;,directives:&#x27;0&#x27;,execute:&#x27;0&#x27;,intel:&#x27;0&#x27;,libraryCode:&#x27;0&#x27;,trim:&#x27;1&#x27;),flagsViewOpen:&#x27;1&#x27;,fontScale:14,fontUsePx:&#x27;0&#x27;,j:1,lang:c%2B%2B,libs:!(),options:&#x27;&#x27;,selection:(endColumn:1,endLineNumber:1,positionColumn:1,positionLineNumber:1,selectionStartColumn:1,selectionStartLineNumber:1,startColumn:1,startLineNumber:1),source:1),l:&#x27;5&#x27;,n:&#x27;0&#x27;,o:&#x27;+x86-64+gcc+13.1+(Editor+%231)&#x27;,t:&#x27;0&#x27;)),header:(),l:&#x27;4&#x27;,m:50,n:&#x27;0&#x27;,o:&#x27;&#x27;,s:0,t:&#x27;0&#x27;)),k:33.749082905355834,l:&#x27;3&#x27;,n:&#x27;0&#x27;,o:&#x27;&#x27;,t:&#x27;0&#x27;)),l:&#x27;2&#x27;,n:&#x27;0&#x27;,o:&#x27;&#x27;,t:&#x27;0&#x27;)),version:4)</p>'
		);
	});

	test('link with space between [] and ()', () => {
		const text = `[ice creams] (https://www.google.com)`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p><a href="https://www.google.com" rel="noopener nofollow ugc">ice creams</a></p>'
		);
	});

	test('link with new line between [] and ()', () => {
		const text = `[ice creams]\n(https://www.google.com)`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p><a href="https://www.google.com" rel="noopener nofollow ugc">ice creams</a></p>'
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

	test('url with ] at end', () => {
		const htmlResult = converter('[edit for reference: https://builtwith.com/elf.tech]');
		expect(htmlResult).toBe(
			'<p>[edit for reference: <a href="https://builtwith.com/elf.tech" rel="noopener nofollow ugc">https://builtwith.com/elf.tech</a>]</p>'
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
