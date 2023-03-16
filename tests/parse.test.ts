import { describe, test, expect } from 'vitest';
import { a } from '../src/index.js';

describe('test', () => {
	test('test', () => {
		expect(a()).toBe('hello');
	});
});
