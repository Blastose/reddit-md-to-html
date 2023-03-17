import { describe, test, expect } from 'vitest';
import { htmlOutput, parse } from '../src/index.js';

describe('general', () => {
	test('heading with bolded links', () => {
		const text = `##[**r/arknights Wiki**](/r/arknights/wiki/index) - A compilation of many tools, resources, and guides on various topics.
##[**Frequently Asked Questions**](/r/arknights/comments/fwmq7u/frequently_asked_questions_rarknights_faq/)
`;

		const htmlResult = htmlOutput(parse(text));
		expect(htmlResult).toBe(
			'<h2><a href="/r/arknights/wiki/index"><strong>r/arknights Wiki</strong></a> - A compilation of many tools, resources, and guides on various topics.</h2><h2><a href="/r/arknights/comments/fwmq7u/frequently_asked_questions_rarknights_faq/"><strong>Frequently Asked Questions</strong></a></h2>'
		);
	});
});
