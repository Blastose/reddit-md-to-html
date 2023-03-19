import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('table', () => {
	test('normal table', () => {
		const text = `|Lorem|Ipsum|Dolor|
|-----|-----|-----|
|8    |1    |3    |
|3    |7    |8    |`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<table><thead><tr><th scope="col">Lorem</th><th scope="col">Ipsum</th><th scope="col">Dolor</th></tr></thead><tbody><tr><td>8</td><td>1</td><td>3</td></tr><tr><td>3</td><td>7</td><td>8</td></tr></tbody></table>'
		);
	});

	test('table with no | endings', () => {
		const text = `|Lorem|Ipsum|Dolor
|-----|-----|-----
|8    |1    |3    
|3    |7    |8    `;
		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			'<table><thead><tr><th scope="col">Lorem</th><th scope="col">Ipsum</th><th scope="col">Dolor</th></tr></thead><tbody><tr><td>8</td><td>1</td><td>3</td></tr><tr><td>3</td><td>7</td><td>8</td></tr></tbody></table>'
		);
	});

	test('table with too many markerrows', () => {
		const text = `|#|Match|PST|EST|CET|KST
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:
|1|BDS vs AST|10:00 AM|1:00 PM|18:00|02:00
|2|XL vs MAD|11:00 AM|2:00 PM|19:00|03:00
|3|TH vs FNC|12:00 PM|3:00 PM|20:00|04:00
|4|SK vs KOI|1:00 PM|4:00 PM|21:00|05:00
|5|G2 vs VIT|2:00 PM|5:00 PM|22:00|06:00`;
		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			'<table><thead><tr><th style="text-align:center;" scope="col">#</th><th style="text-align:center;" scope="col">Match</th><th style="text-align:center;" scope="col">PST</th><th style="text-align:center;" scope="col">EST</th><th style="text-align:center;" scope="col">CET</th><th style="text-align:center;" scope="col">KST</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">BDS vs AST</td><td style="text-align:center;">10:00 AM</td><td style="text-align:center;">1:00 PM</td><td style="text-align:center;">18:00</td><td style="text-align:center;">02:00</td></tr><tr><td style="text-align:center;">2</td><td style="text-align:center;">XL vs MAD</td><td style="text-align:center;">11:00 AM</td><td style="text-align:center;">2:00 PM</td><td style="text-align:center;">19:00</td><td style="text-align:center;">03:00</td></tr><tr><td style="text-align:center;">3</td><td style="text-align:center;">TH vs FNC</td><td style="text-align:center;">12:00 PM</td><td style="text-align:center;">3:00 PM</td><td style="text-align:center;">20:00</td><td style="text-align:center;">04:00</td></tr><tr><td style="text-align:center;">4</td><td style="text-align:center;">SK vs KOI</td><td style="text-align:center;">1:00 PM</td><td style="text-align:center;">4:00 PM</td><td style="text-align:center;">21:00</td><td style="text-align:center;">05:00</td></tr><tr><td style="text-align:center;">5</td><td style="text-align:center;">G2 vs VIT</td><td style="text-align:center;">2:00 PM</td><td style="text-align:center;">5:00 PM</td><td style="text-align:center;">22:00</td><td style="text-align:center;">06:00</td></tr></tbody></table>'
		);
	});
});
