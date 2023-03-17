import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('spoiler', () => {
	test('normal spoiler text', () => {
		const text = '>! Spoiler text here !<';

		const htmlResult = converter(text);

		expect(htmlResult).toBe('<p><span class="spoiler">Spoiler text here</span></p>');
	});
});
