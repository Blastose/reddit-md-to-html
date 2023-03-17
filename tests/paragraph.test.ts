/* eslint-disable no-irregular-whitespace */
import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('paragraph', () => {
	test('normal paragraph', () => {
		const text = `Far out sun.

Orbiting this is
a pretty neat idea.

This planet is odd because`;
		const htmlResult = converter(text);

		expect(htmlResult).toBe(`<p>Far out sun.</p><p>Orbiting this is
a pretty neat idea.</p><p>This planet is odd because</p>`);
	});

	test('text with &#x200B; breaks', () => {
		const text = `Far out sun.

&#x200b;

Orbiting this is
a pretty neat idea.

&#x200b;

This planet is odd because`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(`<p>Far out sun.</p><p>​</p><p>Orbiting this is
a pretty neat idea.</p><p>​</p><p>This planet is odd because</p>`);
	});

	test('text with &nbsp; breaks', () => {
		const text = `Far out sun.

&nbsp;

Orbiting this is
a pretty neat idea.

&nbsp;

This planet is odd because`;

		const htmlResult = converter(text);

		expect(htmlResult).toBe(`<p>Far out sun.</p><p>&nbsp;</p><p>Orbiting this is
a pretty neat idea.</p><p>&nbsp;</p><p>This planet is odd because</p>`);
	});
});
