import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('add target blank', () => {
	test('adds target="_blank" when specified in options', () => {
		const text = `This is a link: https://www.google.ca
		
This is another link <https://www.google.ca>

This is another another link [google](https://www.google.ca)`;
		const htmlResult = converter(text, { addTargetBlank: true });
		expect(htmlResult).toBe(
			'<p>This is a link: <a href="https://www.google.ca" rel="noopener nofollow ugc" target="_blank">https://www.google.ca</a></p><p>This is another link <a href="https://www.google.ca" rel="noopener nofollow ugc" target="_blank">https://www.google.ca</a></p><p>This is another another link <a href="https://www.google.ca" rel="noopener nofollow ugc" target="_blank">google</a></p>'
		);
	});

	test('does not add target="_blank" when specified in options', () => {
		const text = `This is a link: https://www.google.ca`;
		const htmlResult = converter(text, { addTargetBlank: false });
		expect(htmlResult).toBe(
			'<p>This is a link: <a href="https://www.google.ca" rel="noopener nofollow ugc">https://www.google.ca</a></p>'
		);
	});
});
