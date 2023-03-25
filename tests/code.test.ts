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

	test('1 line 4 spaces codeblock with link', () => {
		const text = `    [LN Title](/s "LN Spoiler")`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(`<pre><code>[LN Title](/s &quot;LN Spoiler&quot;)</code></pre>`);
	});

	test('4 spaces codeblock and >>>', () => {
		const text = `There are conversion functions in the datetime module.

    >>> datetime.strptime("01", "%m").strftime("%B")
    'January'
    >>> datetime.strptime("02", "%m").strftime("%B")
    'February'
>>>

The datetime module has a template language that converts from days/weeks/months, etc.

https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior`;

		const htmlResult = converter(text);

		expect(htmlResult)
			.toBe(`<p>There are conversion functions in the datetime module.</p><pre><code>&gt;&gt;&gt; datetime.strptime(&quot;01&quot;, &quot;%m&quot;).strftime(&quot;%B&quot;)
&#x27;January&#x27;
&gt;&gt;&gt; datetime.strptime(&quot;02&quot;, &quot;%m&quot;).strftime(&quot;%B&quot;)
&#x27;February&#x27;</code></pre><blockquote><blockquote><blockquote>
</blockquote></blockquote></blockquote><p>The datetime module has a template language that converts from days/weeks/months, etc.</p><p><a href="https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior" rel="noopener nofollow ugc">https://docs.python.org/3/library/datetime.html#strftime-and-strptime-behavior</a></p>`);
	});

	test('4 spaces codeblock with empty line in between', () => {
		const text = `    function (a: string) {
        return a;
    }
    
    function (b: number) {
        return b;
    }`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<pre><code>function (a: string) {
    return a;
}

function (b: number) {
    return b;
}</code></pre>`
		);
	});

	test('4 spaces codeblock with 1 space at end', () => {
		const text = `    <Dorohedoro>
    <Golden Kamuy>
 `;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(`<pre><code>&lt;Dorohedoro&gt;
&lt;Golden Kamuy&gt;</code></pre>`);
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
