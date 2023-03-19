import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('heading', () => {
	test('normal heading', () => {
		const htmlResult = converter('#heading');

		expect(htmlResult).toBe('<h1>heading</h1>');
	});

	test('underline heading', () => {
		const htmlResult = converter('heading\n===');

		expect(htmlResult).toBe('<h1>heading</h1>');
	});
});
