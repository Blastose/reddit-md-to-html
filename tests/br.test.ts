import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('br', () => {
	test('2 spaces line breaks', () => {
		const text = `Out beyond ideas of wrongdoing  
and rightdoing there is a field.  
I'll meet you there.
`;
		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			`<p>Out beyond ideas of wrongdoing<br>and rightdoing there is a field.<br>I&#x27;ll meet you there.</p>`
		);
	});

	test('backslash line breaks', () => {
		const text = String.raw`Out beyond ideas of wrongdoing\
and rightdoing there is a field.\
I'll meet you there.
`;
		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			`<p>Out beyond ideas of wrongdoing<br>and rightdoing there is a field.<br>I&#x27;ll meet you there.</p>`
		);
	});
});
