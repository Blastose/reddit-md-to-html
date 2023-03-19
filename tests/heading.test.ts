import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('general', () => {
	test('bold-itatlic', () => {
		const htmlResult = converter(
			'It is ***error*** only, and not ___truth___, that shrinks from inquiry.'
		);

		// em strong order is reversed in new reddit, but visually the result is the same
		expect(htmlResult).toBe(
			'<p>It is <em><strong>error</strong></em> only, and not <em><strong>truth</strong></em>, that shrinks from inquiry.</p>'
		);
	});
});
