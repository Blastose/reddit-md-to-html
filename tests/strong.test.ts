import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('strong', () => {
	test('TODO', () => {
		const htmlResult = converter(
			'**The game seemed to be decent, but C9 almost never had a situation where they were able to solidify their lead, or was able to play without being rushed****^(5)****. I think the matchup at top influenced these points quite a lot.**'
		);
		expect(htmlResult).toBe(
			'<p><strong>The game seemed to be decent, but C9 almost never had a situation where they were able to solidify their lead, or was able to play without being rushed</strong><strong><sup>5</sup></strong><strong>. I think the matchup at top influenced these points quite a lot.</strong></p>'
		);
	});
});
