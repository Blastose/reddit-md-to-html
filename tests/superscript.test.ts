import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('superscript', () => {
	test('normal superscript', () => {
		const htmlResult = converter('^superscript');
		expect(htmlResult).toBe('<p><sup>superscript</sup></p>');
	});

	test('nested superscripts', () => {
		const htmlResult = converter('^j^j');
		expect(htmlResult).toBe('<p><sup>j</sup><sup>j</sup></p>');
	});

	test('nested superscripts and links', () => {
		const htmlResult = converter(
			'reddit ^and [^be ^reddited](https://www.redditgifts.com) ^in ^return.'
		);
		expect(htmlResult).toBe(
			'<p>reddit <sup>and</sup> <a href="https://www.redditgifts.com"><sup>be</sup> <sup>reddited</sup></a> <sup>in</sup> <sup>return.</sup></p>'
		);
	});
});
