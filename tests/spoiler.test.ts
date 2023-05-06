import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('spoiler', () => {
	test('normal spoiler text', () => {
		const text = '>! Spoiler text here !<';

		const htmlResult = converter(text);

		expect(htmlResult).toBe('<p><span class="spoiler">Spoiler text here</span></p>');
	});

	test('spoiler text with new one line inbetween', () => {
		const text = `>!And then there's the part when Umi invited Yuu and her 2 friends to watch a movie together. The 2 friends declined for the reason of cram school and Umi didn't want to invite Yuu alone so as not to leave the 2 friends out. Then, when Umi was on the way to the cinema, she saw Yuu and the 2 friends hanging out together without even inviting Umi. When Yuu pointed out that Umi wasn't around, the 2 friends lied to her so as to ostracize Umi and monopolize Yuu for themselves. She
Umi felt so betrayed, she straight up FTSIO and transfered to a different high school instead of continuing at the same high school as them.!<`;

		const htmlResult = converter(text);
		expect(htmlResult)
			.toBe(`<p><span class="spoiler">And then there&#x27;s the part when Umi invited Yuu and her 2 friends to watch a movie together. The 2 friends declined for the reason of cram school and Umi didn&#x27;t want to invite Yuu alone so as not to leave the 2 friends out. Then, when Umi was on the way to the cinema, she saw Yuu and the 2 friends hanging out together without even inviting Umi. When Yuu pointed out that Umi wasn&#x27;t around, the 2 friends lied to her so as to ostracize Umi and monopolize Yuu for themselves. She
Umi felt so betrayed, she straight up FTSIO and transfered to a different high school instead of continuing at the same high school as them.</span></p>`);
	});

	test('spoiler text does not match when two new lines inbetween', () => {
		const text = `>! Spoiler 

text here !<`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(`<p>&gt;! Spoiler </p><p>text here !&lt;</p>`);
	});
});
