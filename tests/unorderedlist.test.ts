import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('unorderedlist', () => {
	test('normal unorderedlist', () => {
		const text = `* this
* is
* a great
* list
* with
* text`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ul><li>this</li><li>is</li><li>a great</li><li>list</li><li>with</li><li>text</li></ul>'
		);
	});
});

describe('nested unorderedlists', () => {
	test('normal nested', () => {
		const text = `* this
* is
  * a
  * great list
`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ul><li>this</li><li>is\n<ul><li>a</li><li>great list</li></ul></li></ul>'
		);
	});
});
