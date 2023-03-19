import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('orderedlist', () => {
	test('normal orderedlist', () => {
		const text = `1. this
2. is
3. a great
4. list
5. with
6. text`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ol start="1"><li>this</li><li>is</li><li>a great</li><li>list</li><li>with</li><li>text</li></ol>'
		);
	});

	test('number that does start with 1 is converted to ol', () => {
		const htmlResult = converter(`1. This is a ol`);
		expect(htmlResult).toBe('<ol start="1"><li>This is a ol</li></ol>');
	});

	test('number that does not start with 1 is not converted to ol', () => {
		const htmlResult = converter(`123. This should not turn into a ordered list`);
		expect(htmlResult).toBe('<p>123. This should not turn into a ordered list</p>');
	});

	test('number that does not start with 1 is not converted to ol, but ones that do after do get converted', () => {
		const text = `123. This should not turn into a ordered list
1. This is a ol
2. this is also a ol`;
		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			`<p>123. This should not turn into a ordered list</p><ol start="1"><li>This is a ol</li><li>this is also a ol</li></ol>`
		);
	});
});

// nested orderedlists do not work currently
describe.skip('nested orderedlists', () => {
	test('normal orderedlist', () => {
		const text = `1. this
2. is
   1. a
   2. great list
`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ol start="1"><li>this</li><li>is</li><li>a great</li><li>list</li><li>with</li><li>text</li></ol>'
		);
	});
});
