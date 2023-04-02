import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('orderedlist', () => {
	test('normal orderedlist', () => {
		const text = `1. this
2. is
3. a great
4. list
5. with
6. text`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ol start="1"><li>this</li><li>is</li><li>a great</li><li>list</li><li>with</li><li>text</li></ol>'
		);
	});

	test('number that does start with 1 is converted to ol', () => {
		const htmlResult = converter(`1. This is a ol`);
		expect(htmlResult).toBe('<ol start="1"><li>This is a ol</li></ol>');
	});

	test('number that does not start with 1 is not converted to ol', () => {
		const htmlResult = converter(`123. This should not turn into a ordered list`);
		expect(htmlResult).toBe('<p>123. This should not turn into a ordered list</p>');
	});

	test('number that does not start with 1 is not converted to ol, but ones that do after do get converted', () => {
		const text = `123. This should not turn into a ordered list
1. This is a ol
2. this is also a ol`;
		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			`<p>123. This should not turn into a ordered list</p><ol start="1"><li>This is a ol</li><li>this is also a ol</li></ol>`
		);
	});

	test('list item separated by new line', () => {
		const text = `Kotlin will always be compared to Java because 

1. It was literally created to be a “better” Java. That’s also why JetBrains put so much effort in to supporting Java interoperability and compatibility with the same IDEs and tooling used by Java developers. 

2. Kotlin’s power comes from java. Kotlin would be dead in the water if it wasn’t able to be compatible with the JVM and familiar enough where java developers could quickly onboard to Kotlin. Running on the same infrastructure as existing Java applications and being close enough to Java that existing developers can quickly onboard is what makes Kotlin an actually viable alternative to Java for companies.


3. I love Kotlin.

500 million. That's all folks.`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<p>Kotlin will always be compared to Java because </p><ol start="1"><li><p>It was literally created to be a “better” Java. That’s also why JetBrains put so much effort in to supporting Java interoperability and compatibility with the same IDEs and tooling used by Java developers.</p></li><li><p>Kotlin’s power comes from java. Kotlin would be dead in the water if it wasn’t able to be compatible with the JVM and familiar enough where java developers could quickly onboard to Kotlin. Running on the same infrastructure as existing Java applications and being close enough to Java that existing developers can quickly onboard is what makes Kotlin an actually viable alternative to Java for companies.</p></li><li><p>I love Kotlin.</p></li></ol><p>500 million. That&#x27;s all folks.</p>'
		);
	});
});

describe('nested orderedlists', () => {
	test('normal orderedlist', () => {
		const text = `1. this
2. is
  1. a
  2. great list
`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<ol start="1"><li>this</li><li>is
<ol start="1"><li>a</li><li>great list</li></ol></li></ol>`
		);
	});
});
