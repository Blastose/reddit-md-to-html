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

	test('bolded parts of word', () => {
		const htmlResult = converter('This is totally sub*der*ma**togly**phic.');
		expect(htmlResult).toBe('<p>This is totally sub<em>der</em>ma<strong>togly</strong>phic.</p>');
	});

	test('strikethrough', () => {
		const htmlResult = converter(
			"The greatest thing you'll ever learn is just to ~~love~~ reddit and be ~~loved~~ reddited in return."
		);
		expect(htmlResult).toBe(
			'<p>The greatest thing you&#x27;ll ever learn is just to <del>love</del> reddit and be <del>loved</del> reddited in return.</p>'
		);
	});
});
