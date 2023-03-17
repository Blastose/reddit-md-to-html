import { describe, test, expect } from 'vitest';
import { htmlOutput, parse } from '../src/index.js';

describe('test', () => {
	test('test heading', () => {
		const text = `##[**r/arknights Wiki**](/r/arknights/wiki/index) - A compilation of many tools, resources, and guides on various topics.
##[**Frequently Asked Questions**](/r/arknights/comments/fwmq7u/frequently_asked_questions_rarknights_faq/)
`;

		const htmlResult = htmlOutput(parse(text));
		expect(htmlResult).toBe(
			'<h2><a href="/r/arknights/wiki/index"><strong>r/arknights Wiki</strong></a> - A compilation of many tools, resources, and guides on various topics.</h2><h2><a href="/r/arknights/comments/fwmq7u/frequently_asked_questions_rarknights_faq/"><strong>Frequently Asked Questions</strong></a></h2>'
		);
	});

	test('test2', () => {
		const htmlResult = htmlOutput(parse('^superscript'));
		expect(htmlResult).toBe('<p><sup>superscript</sup></p>');
	});

	test('nested sups', () => {
		const htmlResult = htmlOutput(parse('^j^j'));
		expect(htmlResult).toBe('<p><sup>j</sup><sup>j</sup></p>');
	});

	test('nested sups and links', () => {
		const htmlResult = htmlOutput(
			parse('reddit ^and [^be ^reddited](https://www.redditgifts.com) ^in ^return.')
		);
		console.log(htmlResult);
	});

	test('test', () => {
		const htmlResult = htmlOutput(parse('>! Spoiler text here !<'));
		expect(htmlResult).toBe('<p><span class="spoiler">Spoiler text here</span></p>');
	});

	test('test3', () => {
		const htmlResult = htmlOutput(parse('>>Blockquote'));
		expect(htmlResult).toBe('<blockquote><blockquote><p>Blockquote</p></blockquote></blockquote>');
	});

	test('236', () => {
		const htmlResult = htmlOutput(
			parse(`Far out in the uncharted backwaters of the unfashionable end of the

western spiral arm of the Galaxy lies a small unregarded yellow sun.

&#x200B;

Orbiting this at a distance of roughly ninety-two million miles is an

utterly insignificant little blue green planet whose ape-descended

life forms are so amazingly primitive that they still think digital

watches are a pretty neat idea.

&#x200B;`)
		);

		console.log(htmlResult);
	});

	test('1236', () => {
		const htmlResult = htmlOutput(parse(`<div>ahisd</div>`));

		console.log(htmlResult);
	});
});
