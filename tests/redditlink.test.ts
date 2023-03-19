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
});
