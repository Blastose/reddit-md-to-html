import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('heading', () => {
	test('normal heading', () => {
		const htmlResult = converter('#heading');

		expect(htmlResult).toBe('<h1>heading</h1>');
	});

	test('heading with <4 spaces in front', () => {
		const htmlResult = converter('   #heading');

		expect(htmlResult).toBe('<h1>heading</h1>');
	});

	test('heading does not convert when there are >3 spaces in front', () => {
		const text = `For example:

    #[derive(thiserror::Error, Debug)]
    pub enum Error {
        #[error(transparent)]
        Contract(#[from] contract::Error),
        #[error(transparent)]
        Events(#[from] events::Error),
        #[error(transparent)]
        Lab(#[from] lab::Error),
        #[error(transparent)]
        Config(#[from] config::Error),
    }`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(`<p>For example:</p><pre><code>#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error(transparent)]
    Contract(#[from] contract::Error),
    #[error(transparent)]
    Events(#[from] events::Error),
    #[error(transparent)]
    Lab(#[from] lab::Error),
    #[error(transparent)]
    Config(#[from] config::Error),
}</code></pre>`);
	});
});

describe('lheading', () => {
	test('underline heading', () => {
		const htmlResult = converter('heading\n===\n\nAnd some text');

		expect(htmlResult).toBe('<h1>heading</h1><p>And some text</p>');
	});

	test('underline heading with one new line after and text', () => {
		const text = `Reproducible Steps:
--------------
1. 
2. 
3. `;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<h2>Reproducible Steps:</h2><ol start="1"><li></li><li></li><li></li></ol>'
		);
	});
});
