import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('blockquote', () => {
	test('nested blockquotes', () => {
		const htmlResult = converter('>>Blockquote');
		expect(htmlResult).toBe('<blockquote><blockquote><p>Blockquote</p></blockquote></blockquote>');
	});
});
