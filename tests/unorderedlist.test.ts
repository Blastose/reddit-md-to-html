import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('unorderedlist', () => {
	test('normal unorderedlist', () => {
		const text = `* this
* is
* a great
* list
* with
* text`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ul><li>this</li><li>is</li><li>a great</li><li>list</li><li>with</li><li>text</li></ul>'
		);
	});

	test('unorderedlist with another list marker inside a list item and bold', () => {
		const text = `- **this is a list with a ** - dash in it
- **some more text** * yeah more text`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ul><li><strong>this is a list with a </strong> - dash in it</li><li><strong>some more text</strong> * yeah more text</li></ul>'
		);
	});

	test('unorderedlist marker only matches when space after list marker', () => {
		const text = `- Playoffs
- Four teams
- Double elimination best of 5

---

**Bracket**`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ul><li>Playoffs</li><li>Four teams</li><li>Double elimination best of 5</li></ul><hr><p><strong>Bracket</strong></p>'
		);
	});

	test('unorderedlist stops matching after two empty new lines (with whitespace)', () => {
		const text = `* Playin Stage
 
 * 8 teams participate
 * Teams are drawn into two double elimination brackets
 * Bracket matches are best of three
 * LCQ match is best of five
 * Winners of each group and the winner of the LCQ match between the lower bracket winners advance to Stage 2

* Bracket Stage
 * 8 teams participate
 * Double elimination bracket
 * All matches are Best of 5
 * Teams are drawn into the bracket with teams from tier 1 and 2 playing teams from tier 3.
 * Teams from tier 1 are placed on the opposite side of the bracket.
 * Teams from the same region can't be draw in the first match of the bracket stage.
 
---
 
###Tiers`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ul><li><p>Playin Stage</p><ul><li>8 teams participate</li><li>Teams are drawn into two double elimination brackets</li><li>Bracket matches are best of three</li><li>LCQ match is best of five</li><li>Winners of each group and the winner of the LCQ match between the lower bracket winners advance to Stage 2</li></ul></li><li><p>Bracket Stage</p><ul><li>8 teams participate</li><li>Double elimination bracket</li><li>All matches are Best of 5</li><li>Teams are drawn into the bracket with teams from tier 1 and 2 playing teams from tier 3.</li><li>Teams from tier 1 are placed on the opposite side of the bracket.</li><li>Teams from the same region can&#x27;t be draw in the first match of the bracket stage.</li></ul></li></ul><hr><h3>Tiers</h3>'
		);
	});

	test('unordered list with text before and a space at the end of that text', () => {
		const text = `# NEW BANNERS

During this event, there will be **TWO DIFFERENT BANNERS.** 

* One of them will include all ships of the collab, but only the **new ones will have a higher chance of dropping**
* One of rhem will consist exclusively of characters from the original run

# New skins`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<h1>NEW BANNERS</h1><p>During this event, there will be <strong>TWO DIFFERENT BANNERS.</strong> </p><ul><li>One of them will include all ships of the collab, but only the <strong>new ones will have a higher chance of dropping</strong></li><li>One of rhem will consist exclusively of characters from the original run</li></ul><h1>New skins</h1>'
		);
	});
});

describe('nested unorderedlists', () => {
	test('normal nested', () => {
		const text = `* this
* is
  * a
  * great list
`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<ul><li>this</li><li>is\n<ul><li>a</li><li>great list</li></ul></li></ul>'
		);
	});
});
