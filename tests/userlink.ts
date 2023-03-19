import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('userlink', () => {
	test('userlink with /u/', () => {
		const htmlResult = converter('/u/jimmy');
		expect(htmlResult).toBe('<p><a href="/u/jimmy">/u/jimmy</a></p>');
	});

	test('userlink with u/', () => {
		const htmlResult = converter('u/jimmy');
		expect(htmlResult).toBe('<p><a href="/u/jimmy">u/jimmy</a></p>');
	});

	test('bolded list userlink', () => {
		const htmlResult = converter('* **/u/jimmy**');
		expect(htmlResult).toBe('<ul><li><strong><a href="/u/jimmy">/u/jimmy</a></strong></li></ul>');
	});
});
