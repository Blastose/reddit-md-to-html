import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('blockquote', () => {
	test('empty blockquote', () => {
		const htmlResult = converter('>');
		expect(htmlResult).toBe('<blockquote>\n</blockquote>');
	});

	test('nested blockquotes', () => {
		const htmlResult = converter('>>Blockquote');
		expect(htmlResult).toBe('<blockquote><blockquote><p>Blockquote</p></blockquote></blockquote>');
	});

	test('blockquote then newline then space with newline', () => {
		const text = `>  - loosing custom  
    
Did you mean to say "losing"?  
Explanation: Loose is an adjective meaning the opposite of tight, while lose is a verb.  
Total mistakes found: 4265  
^^I'm ^^a ^^bot ^^that ^^corrects ^^grammar/spelling ^^mistakes.
^^PM ^^me ^^if ^^I'm ^^wrong ^^or ^^if ^^you ^^have ^^any ^^suggestions.   
^^[Github](https://github.com/chiefpat450119)`;
		const htmlResult = converter(text);
		expect(htmlResult)
			.toBe(`<blockquote><ul><li>loosing custom</li></ul></blockquote><pre><code></code></pre><p>Did you mean to say &quot;losing&quot;?<br>Explanation: Loose is an adjective meaning the opposite of tight, while lose is a verb.<br>Total mistakes found: 4265<br><sup>I&#x27;m</sup> <sup>a</sup> <sup>bot</sup> <sup>that</sup> <sup>corrects</sup> <sup>grammar/spelling</sup> <sup>mistakes.</sup>
<sup>PM</sup> <sup>me</sup> <sup>if</sup> <sup>I&#x27;m</sup> <sup>wrong</sup> <sup>or</sup> <sup>if</sup> <sup>you</sup> <sup>have</sup> <sup>any</sup> <sup>suggestions.</sup><br><sup><a href="https://github.com/chiefpat450119">Github</a></sup></p>`);
	});

	test('multiline blockquote', () => {
		const text = `> Some text
> 
> some more text
> 
> even more text`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<blockquote><p>Some text</p><p>some more text</p><p>even more text</p></blockquote>`
		);
	});

	test('blockquote newline text', () => {
		const text = `> This is some text
This text should not be on a new line
> Nor should this text be  
This text should have a br before it`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<blockquote><p>This is some text
This text should not be on a new line
Nor should this text be<br>This text should have a br before it</p></blockquote>`
		);
	});
});
