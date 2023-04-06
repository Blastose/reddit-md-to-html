import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('heading', () => {
	test('normal heading', () => {
		const htmlResult = converter('#heading');

		expect(htmlResult).toBe('<h1>heading</h1>');
	});
});

describe('lheading', () => {
	test('underline heading', () => {
		const htmlResult = converter('heading\n===\n\nAnd some text');

		expect(htmlResult).toBe('<h1>heading</h1><p>And some text</p>');
	});

	test('underline heading with one new line after and text', () => {
		const text = `Reproducible Steps:
--------------
1. 
2. 
3. `;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<h2>Reproducible Steps:</h2><ol start="1"><li></li><li></li><li></li></ol>'
		);
	});
});
