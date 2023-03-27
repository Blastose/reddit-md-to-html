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
			.toBe(`<blockquote><ul><li>loosing custom<br></li></ul></blockquote><p>Did you mean to say &quot;losing&quot;?<br>Explanation: Loose is an adjective meaning the opposite of tight, while lose is a verb.<br>Total mistakes found: 4265<br><sup>I&#x27;m</sup> <sup>a</sup> <sup>bot</sup> <sup>that</sup> <sup>corrects</sup> <sup>grammar/spelling</sup> <sup>mistakes.</sup>
<sup>PM</sup> <sup>me</sup> <sup>if</sup> <sup>I&#x27;m</sup> <sup>wrong</sup> <sup>or</sup> <sup>if</sup> <sup>you</sup> <sup>have</sup> <sup>any</sup> <sup>suggestions.</sup><br><sup><a href="https://github.com/chiefpat450119" rel="noopener nofollow ugc">Github</a></sup></p>`);
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

	test('2 blockquotes separated by space', () => {
		const text = `Really exciting seeing more updates from Bevy!

Might be a dumb question but I really don't understand the \`in_set\` function from this post.

>You can add systems to sets by calling the \`in_set\` method:
 
>    app.add_system(gravity.in_set(PhysicsSet::Movement))

Are we adding \`gravity\` to \`PhysicsSet\`? Why did we mention \`Movement\` then? Does this have to be added to a set inside a \`app.add_system()\` call? I feel like the other examples and docs don't help explain what is going on here...

...

Okay, I think I get it now, this isn't a set of systems, but instead a set of labels. I'm going to post my comment anyways because I personally found this very confusing, and I think the naming could use some work. Sounds amazingly powerful now that I understand it correctly.`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<p>Really exciting seeing more updates from Bevy!</p><p>Might be a dumb question but I really don&#x27;t understand the <code>in_set</code> function from this post.</p><blockquote><p>You can add systems to sets by calling the <code>in_set</code> method:</p></blockquote><blockquote><p>app.add_system(gravity.in_set(PhysicsSet::Movement))</p></blockquote><p>Are we adding <code>gravity</code> to <code>PhysicsSet</code>? Why did we mention <code>Movement</code> then? Does this have to be added to a set inside a <code>app.add_system()</code> call? I feel like the other examples and docs don&#x27;t help explain what is going on here...</p><p>...</p><p>Okay, I think I get it now, this isn&#x27;t a set of systems, but instead a set of labels. I&#x27;m going to post my comment anyways because I personally found this very confusing, and I think the naming could use some work. Sounds amazingly powerful now that I understand it correctly.</p>`
		);
	});
});
