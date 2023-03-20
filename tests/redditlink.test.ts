import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('redditlink', () => {
	test('redditlink with /r/', () => {
		const htmlResult = converter('/r/learnprogramming');
		expect(htmlResult).toBe('<p><a href="/r/learnprogramming">/r/learnprogramming</a></p>');
	});

	test('redditlink with r/', () => {
		const htmlResult = converter('r/learnprogramming');
		expect(htmlResult).toBe('<p><a href="/r/learnprogramming">r/learnprogramming</a></p>');
	});

	test('redditlink with less than 2 characters in subreddit name does not output a', () => {
		const htmlResult = converter('/r/a');
		expect(htmlResult).toBe('<p>/r/a</p>');
	});

	test('redditlink with more than 24 characters in subredditname only outputs the first 24 characters', () => {
		const htmlResult = converter('/r/aabbcceeffgghhyyuuiiooppa');
		expect(htmlResult).toBe(
			'<p><a href="/r/aabbcceeffgghhyyuuiioopp">/r/aabbcceeffgghhyyuuiioopp</a>a</p>'
		);
	});

	test('bolded list redditlink', () => {
		const htmlResult = converter('* **/r/OtonariNoTenshiSama**');
		expect(htmlResult).toBe(
			'<ul><li><strong><a href="/r/OtonariNoTenshiSama">/r/OtonariNoTenshiSama</a></strong></li></ul>'
		);
	});

	test('heading with bolded links with r/ in text', () => {
		const text = `##[**r/arknights Wiki**](/r/arknights/wiki/index) - A compilation of many tools, resources, and guides on various topics.
##[**Frequently Asked Questions**](/r/arknights/comments/fwmq7u/frequently_asked_questions_rarknights_faq/)
`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<h2><a href="/r/arknights/wiki/index"><strong>r/arknights Wiki</strong></a> - A compilation of many tools, resources, and guides on various topics.</h2><h2><a href="/r/arknights/comments/fwmq7u/frequently_asked_questions_rarknights_faq/"><strong>Frequently Asked Questions</strong></a></h2>'
		);
	});

	test('link', () => {
		const text = `Are you a person?

EDIT: oh damn, I think OP blocked me. Sorry, OP, I didn't mean any offence. r/programminghumor made me think it was a normal thing to say.`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p>Are you a person?</p><p>EDIT: oh damn, I think OP blocked me. Sorry, OP, I didn&#x27;t mean any offence. <a href="/r/programminghumor">r/programminghumor</a> made me think it was a normal thing to say.</p>'
		);
	});
});
