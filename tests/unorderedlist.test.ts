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

	test('unorderedlist with another list marker inside a list item and bold', () => {
		const text = `- **this is a list with a ** - dash in it
- **some more text** * yeah more text`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ul><li><strong>this is a list with a </strong> - dash in it</li><li><strong>some more text</strong> * yeah more text</li></ul>'
		);
	});

	test('unorderedlist marker only matches when space after list marker', () => {
		const text = `- Playoffs
- Four teams
- Double elimination best of 5

---

**Bracket**`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ul><li>Playoffs</li><li>Four teams</li><li>Double elimination best of 5</li></ul><hr><p><strong>Bracket</strong></p>'
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
