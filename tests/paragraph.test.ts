import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('paragraph', () => {
	test('normal paragraph', () => {
		const text = `Far out sun.

Orbiting this is
a pretty neat idea.

This planet is odd because`;
		const htmlResult = converter(text);

		expect(htmlResult).toBe(`<p>Far out sun.</p><p>Orbiting this is
a pretty neat idea.</p><p>This planet is odd because</p>`);
	});

	test('paragraph with &#x200B; breaks', () => {
		const text = `Far out sun.

&#x200b;

Orbiting this is
a pretty neat idea.

&#x200b;

This planet is odd because`;

		const htmlResult = converter(text);
		console.log(htmlResult);

		expect(htmlResult).toBe(`<p>Far out sun.</p><p>​</p><p>Orbiting this is
a pretty neat idea.</p><p>​</p><p>This planet is odd because</p>`);
	});

	test('paragraph with lines with 2 spaces after to make <br>', () => {
		const text = `I'm looking for,  
to ask some questions

If anyone knows  
Please let me know

Thanks,  
and enjoy life
`;

		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			'<p>I&#x27;m looking for,<br>to ask some questions</p><p>If anyone knows<br>Please let me know</p><p>Thanks,<br>and enjoy life</p>'
		);
	});
});
