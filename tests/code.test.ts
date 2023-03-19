import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('codeBlock', () => {
	test('4 spaces codeblock', () => {
		const text = `    function (a: string) {
      return a;
    }
`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<pre><code>function (a: string) {
  return a;
}</code></pre>`
		);
	});

	test('triple backtick codeblock', () => {
		const text = `\`\`\`
function (a: string) {
  return a;
}\`\`\`
`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<pre><code>function (a: string) {
  return a;
}</code></pre>`
		);
	});
});

describe('inlineCode', () => {
	test('inline code', () => {
		const text = 'Run `python3 run.py` to run it';
		const htmlResult = converter(text);
		expect(htmlResult).toBe('<p>Run <code>python3 run.py</code> to run it</p>');
	});
});
