import { describe, test, expect } from 'vitest';
import { parse } from '../src/index.js';

describe('text splitting', () => {
	test('text splits', () => {
		const text = '>! Spoiler text here !<';
		const expectedTree = [
			{
				content: [
					{
						content: [{ content: 'Spoiler text here', type: 'text' }],
						type: 'spoiler'
					}
				],
				type: 'paragraph'
			}
		];

		expect(parse(text)).toStrictEqual(expectedTree);
	});
});
