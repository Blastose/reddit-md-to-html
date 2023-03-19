import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('superscript', () => {
	test('normal superscript', () => {
		const htmlResult = converter('^superscript.');
		expect(htmlResult).toBe('<p><sup>superscript.</sup></p>');
	});

	// New reddit md doesn't allow for nested superscripts but old reddit does
	// The converter matches new reddit in this case
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

	test('superscript with brackets', () => {
		const htmlResult = converter('^(superscript is cool)');
		expect(htmlResult).toBe('<p><sup>superscript is cool</sup></p>');
	});

	test('superscript with brackets and strong', () => {
		const htmlResult = converter('^(some text here + __bolded__)');
		expect(htmlResult).toBe('<p><sup>some text here + <strong>bolded</strong></sup></p>');
	});

	// Inconsistent with both new and old reddit
	test.fails('superscript with em', () => {
		const htmlResult = converter('^(superscript-_+_++_+_++++___+_+__******#**!#@$#${}[])');

		expect(htmlResult).toBe(
			'<p><sup>superscript-</sup><sup><em>+_++_+_++++___+_+</em></sup><sup>_****</sup><sup><strong>#</strong></sup><sup>!#@$#${}[]</sup></p>'
		);
	});
});
