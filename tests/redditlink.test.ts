import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('redditlink', () => {
	test('redditlink with /r/', () => {
		const htmlResult = converter('/r/learnprogramming');
		expect(htmlResult).toBe(
			'<p><a href="/r/learnprogramming" rel="noopener nofollow ugc">/r/learnprogramming</a></p>'
		);
	});

	test('redditlink with r/', () => {
		const htmlResult = converter('r/learnprogramming');
		expect(htmlResult).toBe(
			'<p><a href="/r/learnprogramming" rel="noopener nofollow ugc">r/learnprogramming</a></p>'
		);
	});

	test('bolded list redditlink', () => {
		const htmlResult = converter('* **/r/OtonariNoTenshiSama**');
		expect(htmlResult).toBe(
			'<ul><li><strong><a href="/r/OtonariNoTenshiSama" rel="noopener nofollow ugc">/r/OtonariNoTenshiSama</a></strong></li></ul>'
		);
	});

	test('heading with bolded links with r/ in text', () => {
		const text = `##[**r/arknights Wiki**](/r/arknights/wiki/index) - A compilation of many tools, resources, and guides on various topics.
##[**Frequently Asked Questions**](/r/arknights/comments/fwmq7u/frequently_asked_questions_rarknights_faq/)
`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<h2><a href="/r/arknights/wiki/index" rel="noopener nofollow ugc"><strong>r/arknights Wiki</strong></a> - A compilation of many tools, resources, and guides on various topics.</h2><h2><a href="/r/arknights/comments/fwmq7u/frequently_asked_questions_rarknights_faq/" rel="noopener nofollow ugc"><strong>Frequently Asked Questions</strong></a></h2>'
		);
	});

	test('redditlink at start of sentence', () => {
		const text = `Are you a person?

EDIT: oh damn, I think OP blocked me. Sorry, OP, I didn't mean any offence. r/programminghumor made me think it was a normal thing to say.`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p>Are you a person?</p><p>EDIT: oh damn, I think OP blocked me. Sorry, OP, I didn&#x27;t mean any offence. <a href="/r/programminghumor" rel="noopener nofollow ugc">r/programminghumor</a> made me think it was a normal thing to say.</p>'
		);
	});

	test('does not match `text`r/`subreddit` in connected word', () => {
		const text = `converter/function`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe('<p>converter/function</p>');
	});

	test('does not match `text`r/`subreddit` in connected word with text in front', () => {
		const htmlResult = converter(
			"Which it's so makes twitter/youtube/twitch like badges of honor."
		);
		expect(htmlResult).toBe(
			'<p>Which it&#x27;s so makes twitter/youtube/twitch like badges of honor.</p>'
		);
	});

	test('stops when non-character/number in subreddit name', () => {
		const htmlResult = converter('r/burnt-baco_n');
		expect(htmlResult).toBe(
			'<p><a href="/r/burnt" rel="noopener nofollow ugc">r/burnt</a>-baco_n</p>'
		);
	});

	test('parenthesis before subreddit link', () => {
		const htmlResult = converter('(r/burnt-baco_n');
		expect(htmlResult).toBe(
			'<p>(<a href="/r/burnt" rel="noopener nofollow ugc">r/burnt</a>-baco_n</p>'
		);
	});

	test('subreddit links in an unordered list', () => {
		const text = `- /r/Hololive
- /r/Nijisanji
- /r/VShojo
- /r/4VLive`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ul><li><a href="/r/Hololive" rel="noopener nofollow ugc">/r/Hololive</a></li><li><a href="/r/Nijisanji" rel="noopener nofollow ugc">/r/Nijisanji</a></li><li><a href="/r/VShojo" rel="noopener nofollow ugc">/r/VShojo</a></li><li><a href="/r/4VLive" rel="noopener nofollow ugc">/r/4VLive</a></li></ul>'
		);
	});
});

describe('userlink', () => {
	test('userlink with /u/', () => {
		const htmlResult = converter('/u/jimmy');
		expect(htmlResult).toBe('<p><a href="/u/jimmy" rel="noopener nofollow ugc">/u/jimmy</a></p>');
	});

	test('userlink with u/', () => {
		const htmlResult = converter('u/jimmy');
		expect(htmlResult).toBe('<p><a href="/u/jimmy" rel="noopener nofollow ugc">u/jimmy</a></p>');
	});

	test('bolded list userlink', () => {
		const htmlResult = converter('* **/u/jimmy**');
		expect(htmlResult).toBe(
			'<ul><li><strong><a href="/u/jimmy" rel="noopener nofollow ugc">/u/jimmy</a></strong></li></ul>'
		);
	});

	test('two userlinks with space between', () => {
		const htmlResult = converter('u/BlazeOfCinder u/MajicPotatoRA');
		expect(htmlResult).toBe(
			'<p><a href="/u/BlazeOfCinder" rel="noopener nofollow ugc">u/BlazeOfCinder</a> <a href="/u/MajicPotatoRA" rel="noopener nofollow ugc">u/MajicPotatoRA</a></p>'
		);
	});

	test('userlink after a previous match with a new line after', () => {
		const text = `Time went by like in one long nap 

Source 

https://www.google.ca

u/repostsleuthbot`;

		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			'<p>Time went by like in one long nap </p><p>Source </p><p><a href="https://www.google.ca" rel="noopener nofollow ugc">https://www.google.ca</a></p><p><a href="/u/repostsleuthbot" rel="noopener nofollow ugc">u/repostsleuthbot</a></p>'
		);
	});

	test('userlink with hyphen and underscore in name', () => {
		const htmlResult = converter('u/burnt-baco_n');
		expect(htmlResult).toBe(
			'<p><a href="/u/burnt-baco_n" rel="noopener nofollow ugc">u/burnt-baco_n</a></p>'
		);
	});

	test('does not match `text`u/`username` in connected word with text in front', () => {
		const htmlResult = converter(
			"You'll find plenty of reports by quickly searching in this sub. Just because a bug doesn't happen to you/everyone, doesn't mean it's due to a connection issue"
		);
		expect(htmlResult).toBe(
			'<p>You&#x27;ll find plenty of reports by quickly searching in this sub. Just because a bug doesn&#x27;t happen to you/everyone, doesn&#x27;t mean it&#x27;s due to a connection issue</p>'
		);
	});
});
