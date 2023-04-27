import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('superscript', () => {
	test('normal superscript', () => {
		const htmlResult = converter('^superscript.');
		expect(htmlResult).toBe('<p><sup>superscript.</sup></p>');
	});

	// New reddit md doesn't allow for nested superscripts but old reddit does
	// The converter matches new reddit in this case
	test('nested superscripts', () => {
		const htmlResult = converter('^j^j');
		expect(htmlResult).toBe('<p><sup>j</sup><sup>j</sup></p>');
	});

	test('nested superscripts and links', () => {
		const htmlResult = converter(
			'reddit ^and [^be ^reddited](https://www.redditgifts.com) ^in ^return.'
		);
		expect(htmlResult).toBe(
			'<p>reddit <sup>and</sup> <a href="https://www.redditgifts.com" rel="noopener nofollow ugc"><sup>be</sup> <sup>reddited</sup></a> <sup>in</sup> <sup>return.</sup></p>'
		);
	});

	test('superscript with brackets', () => {
		const htmlResult = converter('^(superscript is cool)');
		expect(htmlResult).toBe('<p><sup>superscript is cool</sup></p>');
	});

	test('superscript with brackets and strong', () => {
		const htmlResult = converter('^(some text here + __bolded__)');
		expect(htmlResult).toBe('<p><sup>some text here + <strong>bolded</strong></sup></p>');
	});

	// New reddit only shows one sup, while old reddit has nested sup
	// The converter matches new reddit in this case
	test('superscript with several ^ in a row', () => {
		const htmlResult = converter('^^^^text and ^^^^^some ^^^more^^^text');
		expect(htmlResult).toBe(
			'<p><sup>text</sup> and <sup>some</sup> <sup>more</sup><sup>text</sup></p>'
		);
	});

	test('superscript with url with space in [ ] part of []()', () => {
		const text = `^[xkcd.com](http://www.xkcd.com) ^| ^[xkcd sub](http://www.reddit.com/r/xkcdcomic/)/[kerfuffle](http://www.reddit.com/r/self/comments/1xdwba/the_history_of_the_rxkcd_kerfuffle/) ^| ^[Problems/Bugs?](http://www.reddit.com/r/xkcd_transcriber/) ^| ^[Statistics](http://xkcdref.info/statistics/) ^| ^[Stop Replying](http://reddit.com/message/compose/?to=xkcd_transcriber&subject=ignore%20me&message=ignore%20me)`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<p><sup><a href="http://www.xkcd.com" rel="noopener nofollow ugc">xkcd.com</a></sup> <sup>|</sup> <sup><a href="http://www.reddit.com/r/xkcdcomic/" rel="noopener nofollow ugc">xkcd sub</a>/<a href="http://www.reddit.com/r/self/comments/1xdwba/the_history_of_the_rxkcd_kerfuffle/" rel="noopener nofollow ugc">kerfuffle</a></sup> <sup>|</sup> <sup><a href="http://www.reddit.com/r/xkcd_transcriber/" rel="noopener nofollow ugc">Problems/Bugs?</a></sup> <sup>|</sup> <sup><a href="http://xkcdref.info/statistics/" rel="noopener nofollow ugc">Statistics</a></sup> <sup>|</sup> <sup><a href="http://reddit.com/message/compose/?to=xkcd_transcriber&amp;subject=ignore%20me&amp;message=ignore%20me" rel="noopener nofollow ugc">Stop Replying</a></sup></p>`
		);
	});

	test('superscript with url []() in () part of ^()', () => {
		const text = `^([Click here](https://www.reddit.com/message/compose?to=LuckyNumber-Bot&subject=Stalk%20Me%20Pls&message=%2Fstalkme) to have me scan all your future comments.) \\
^(Summon me on specific comments with u/LuckyNumber-Bot.)`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p><sup><a href="https://www.reddit.com/message/compose?to=LuckyNumber-Bot&amp;subject=Stalk%20Me%20Pls&amp;message=%2Fstalkme" rel="noopener nofollow ugc">Click here</a> to have me scan all your future comments.</sup> <br><sup>Summon me on specific comments with <a href="/u/LuckyNumber-Bot" rel="noopener nofollow ugc">u/LuckyNumber-Bot</a>.</sup></p>'
		);
	});

	test('superscript with ) closing immediately', () => {
		const text = `you have a 3rd party YouTube ^(*or Reddit) client installed that you have set as the Default for YouTube links, this 3rd party client somehow changes the UI so much that you cannot see who (what Channel) the creator is. If that's the case, open the link in your browser of choice, or even pasting the URL into the Search bar in the YouTube app will work. `;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p>you have a 3rd party YouTube <sup>*or Reddit</sup> client installed that you have set as the Default for YouTube links, this 3rd party client somehow changes the UI so much that you cannot see who (what Channel) the creator is. If that&#x27;s the case, open the link in your browser of choice, or even pasting the URL into the Search bar in the YouTube app will work. </p>'
		);
	});

	// Inconsistent with both new and old reddit
	test.fails('superscript with em', () => {
		const htmlResult = converter('^(superscript-_+_++_+_++++___+_+__******#**!#@$#${}[])');

		expect(htmlResult).toBe(
			'<p><sup>superscript-</sup><sup><em>+_++_+_++++___+_+</em></sup><sup>_****</sup><sup><strong>#</strong></sup><sup>!#@$#${}[]</sup></p>'
		);
	});
});
