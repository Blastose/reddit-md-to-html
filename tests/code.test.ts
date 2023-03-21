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

	test('triple backtick codeblock after text without 2 new lines', () => {
		const text = `You could toss everything in a list;
\`\`\`
months = [
  "January",
  "February",
  "March",
  # and so on...
]

birthMonth = 1
print(months[birthMonth-1]) # prints January
\`\`\`
The \`-1\` is because lists are 0-indexed. The first entry is on index 0, the second on index 1, and so on.`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(`<p>You could toss everything in a list;</p><pre><code>months = [
  &quot;January&quot;,
  &quot;February&quot;,
  &quot;March&quot;,
  # and so on...
]

birthMonth = 1
print(months[birthMonth-1]) # prints January</code></pre><p>The <code>-1</code> is because lists are 0-indexed. The first entry is on index 0, the second on index 1, and so on.</p>`);
	});
});

describe('inlineCode', () => {
	test('inline code', () => {
		const text = 'Run `python3 run.py` to run it';
		const htmlResult = converter(text);
		expect(htmlResult).toBe('<p>Run <code>python3 run.py</code> to run it</p>');
	});
});
