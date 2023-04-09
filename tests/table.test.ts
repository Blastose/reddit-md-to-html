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

	test('table with too many | after each row', () => {
		const text = `|#|Match|PST|EST|CET|KST
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:
|1|BDS vs AST|10:00 AM|1:00 PM|18:00|02:00||||
|2|XL vs MAD|11:00 AM|2:00 PM|19:00|03:00||||
|3|TH vs FNC|12:00 PM|3:00 PM|20:00|04:00||||
|4|SK vs KOI|1:00 PM|4:00 PM|21:00|05:00||||
|5|G2 vs VIT|2:00 PM|5:00 PM|22:00|06:00||||`;
		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			'<table><thead><tr><th style="text-align:center;" scope="col">#</th><th style="text-align:center;" scope="col">Match</th><th style="text-align:center;" scope="col">PST</th><th style="text-align:center;" scope="col">EST</th><th style="text-align:center;" scope="col">CET</th><th style="text-align:center;" scope="col">KST</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">BDS vs AST</td><td style="text-align:center;">10:00 AM</td><td style="text-align:center;">1:00 PM</td><td style="text-align:center;">18:00</td><td style="text-align:center;">02:00</td></tr><tr><td style="text-align:center;">2</td><td style="text-align:center;">XL vs MAD</td><td style="text-align:center;">11:00 AM</td><td style="text-align:center;">2:00 PM</td><td style="text-align:center;">19:00</td><td style="text-align:center;">03:00</td></tr><tr><td style="text-align:center;">3</td><td style="text-align:center;">TH vs FNC</td><td style="text-align:center;">12:00 PM</td><td style="text-align:center;">3:00 PM</td><td style="text-align:center;">20:00</td><td style="text-align:center;">04:00</td></tr><tr><td style="text-align:center;">4</td><td style="text-align:center;">SK vs KOI</td><td style="text-align:center;">1:00 PM</td><td style="text-align:center;">4:00 PM</td><td style="text-align:center;">21:00</td><td style="text-align:center;">05:00</td></tr><tr><td style="text-align:center;">5</td><td style="text-align:center;">G2 vs VIT</td><td style="text-align:center;">2:00 PM</td><td style="text-align:center;">5:00 PM</td><td style="text-align:center;">22:00</td><td style="text-align:center;">06:00</td></tr></tbody></table>'
		);
	});

	test('several tables with links in them', () => {
		const text = `###[Event Overview](https://imgur.com/a/NbXKEjj)

&nbsp;

---
&nbsp;

**Skins and more** |
|:--:|  
[Coral Coast New Arrivals Collection](https://webusstatic.yo-star.com/uy0news/ae/0009052c5c6272d9d10844f59dfdbbd8.png) |
[Epoque Re-Edition Collection](https://webusstatic.yo-star.com/uy0news/ae/b5160e3d1b853da464df66b716370dbb.png) |
| - |
[Rhodes Island's Records of Originium - Rhine Lab](https://www.arknights.global/comic_section?comicId=3)|
| - |
| [Rhine Experimental Culture Pod](https://webusstatic.yo-star.com/uy0news/ae/2a4c9b8a11fdcb0eb4bc82ec03197508.png) |



&nbsp;

---

**GP Event Guides** | **Official Links** | Operators |
|:---:|:---:|:---:|
[General Guide](https://gamepress.gg/arknights/event-banner-hub/dorothys-vision-global-event-page)|[Official Tailer](https://www.youtube.com/watch?v=-CC438OoOiE)| [Dorothy](https://pbs.twimg.com/media/Fq1x1afaQAEzhOG?format=jpg&name=large)
[Farming Guide](https://gamepress.gg/arknights/event-banner-guide-subpage-miscellaneous/dorothys-vision-event-operations-and-farming-guide)|[Animation PV](https://youtu.be/d-tSOGS-jTQ)| [Greyy The Lightningbearer](https://pbs.twimg.com/media/FqsL4WCaYAIKgYt?format=jpg&name=large) |
| - | [Operator Preview](https://twitter.com/ArknightsEN/status/1635506040547471363) | [Astgenne](https://pbs.twimg.com/media/FqxaPJpaMAE5fxg?format=jpg&name=large)


&nbsp;

---
Remember to mark spoilers when discussing event story details! The code for spoilers is: **\\>!spoiler text goes here!<**

This is how it looks: >!spoiler text goes here!<`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			`<h3><a href="https://imgur.com/a/NbXKEjj" rel="noopener nofollow ugc">Event Overview</a></h3><p>&nbsp;</p><hr><p>&nbsp;</p><table><thead><tr><th style="text-align:center;" scope="col"><strong>Skins and more</strong></th></tr></thead><tbody><tr><td style="text-align:center;"><a href="https://webusstatic.yo-star.com/uy0news/ae/0009052c5c6272d9d10844f59dfdbbd8.png" rel="noopener nofollow ugc">Coral Coast New Arrivals Collection</a></td></tr><tr><td style="text-align:center;"><a href="https://webusstatic.yo-star.com/uy0news/ae/b5160e3d1b853da464df66b716370dbb.png" rel="noopener nofollow ugc">Epoque Re-Edition Collection</a></td></tr><tr><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;"><a href="https://www.arknights.global/comic_section?comicId=3" rel="noopener nofollow ugc">Rhodes Island&#x27;s Records of Originium - Rhine Lab</a></td></tr><tr><td style="text-align:center;">-</td></tr><tr><td style="text-align:center;"><a href="https://webusstatic.yo-star.com/uy0news/ae/2a4c9b8a11fdcb0eb4bc82ec03197508.png" rel="noopener nofollow ugc">Rhine Experimental Culture Pod</a></td></tr></tbody></table><p>&nbsp;</p><hr><table><thead><tr><th style="text-align:center;" scope="col"><strong>GP Event Guides</strong></th><th style="text-align:center;" scope="col"><strong>Official Links</strong></th><th style="text-align:center;" scope="col">Operators</th></tr></thead><tbody><tr><td style="text-align:center;"><a href="https://gamepress.gg/arknights/event-banner-hub/dorothys-vision-global-event-page" rel="noopener nofollow ugc">General Guide</a></td><td style="text-align:center;"><a href="https://www.youtube.com/watch?v=-CC438OoOiE" rel="noopener nofollow ugc">Official Tailer</a></td><td style="text-align:center;"><a href="https://pbs.twimg.com/media/Fq1x1afaQAEzhOG?format=jpg&amp;name=large" rel="noopener nofollow ugc">Dorothy</a></td></tr><tr><td style="text-align:center;"><a href="https://gamepress.gg/arknights/event-banner-guide-subpage-miscellaneous/dorothys-vision-event-operations-and-farming-guide" rel="noopener nofollow ugc">Farming Guide</a></td><td style="text-align:center;"><a href="https://youtu.be/d-tSOGS-jTQ" rel="noopener nofollow ugc">Animation PV</a></td><td style="text-align:center;"><a href="https://pbs.twimg.com/media/FqsL4WCaYAIKgYt?format=jpg&amp;name=large" rel="noopener nofollow ugc">Greyy The Lightningbearer</a></td></tr><tr><td style="text-align:center;">-</td><td style="text-align:center;"><a href="https://twitter.com/ArknightsEN/status/1635506040547471363" rel="noopener nofollow ugc">Operator Preview</a></td><td style="text-align:center;"><a href="https://pbs.twimg.com/media/FqxaPJpaMAE5fxg?format=jpg&amp;name=large" rel="noopener nofollow ugc">Astgenne</a></td></tr></tbody></table><p>&nbsp;</p><hr><p>Remember to mark spoilers when discussing event story details! The code for spoilers is: <strong>&gt;!spoiler text goes here!&lt;</strong></p><p>This is how it looks: <span class="spoiler">spoiler text goes here</span></p>`
		);
	});

	test('table with superscripts', () => {
		const text = `|**EG**|3-17-4|[vs](#mt-kills)|17-3-42|**GG**|
|--:|--:|:--:|:--|:--|
|Ssumday sion ^3|1-2-1|TOP|3-2-3|^4 gwen Licorice|
|Inspired vi ^1|2-2-1|JNG|6-0-9|^1 maokai River|
|jojopyun ahri ^2|0-4-1|MID|0-1-10|^1 ksante Gori|
|FBI zeri ^2|0-5-0|BOT|7-0-6|^2 tristana Stixxay|
|Vulcan nautilus ^3|0-4-1|SUP|1-0-14|^3 rell huhi|`;
		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<table><thead><tr><th style="text-align:right;" scope="col"><strong>EG</strong></th><th style="text-align:right;" scope="col">3-17-4</th><th style="text-align:center;" scope="col"><a href="#mt-kills" rel="noopener nofollow ugc">vs</a></th><th style="text-align:left;" scope="col">17-3-42</th><th style="text-align:left;" scope="col"><strong>GG</strong></th></tr></thead><tbody><tr><td style="text-align:right;">Ssumday sion <sup>3</sup></td><td style="text-align:right;">1-2-1</td><td style="text-align:center;">TOP</td><td style="text-align:left;">3-2-3</td><td style="text-align:left;"><sup>4</sup> gwen Licorice</td></tr><tr><td style="text-align:right;">Inspired vi <sup>1</sup></td><td style="text-align:right;">2-2-1</td><td style="text-align:center;">JNG</td><td style="text-align:left;">6-0-9</td><td style="text-align:left;"><sup>1</sup> maokai River</td></tr><tr><td style="text-align:right;">jojopyun ahri <sup>2</sup></td><td style="text-align:right;">0-4-1</td><td style="text-align:center;">MID</td><td style="text-align:left;">0-1-10</td><td style="text-align:left;"><sup>1</sup> ksante Gori</td></tr><tr><td style="text-align:right;">FBI zeri <sup>2</sup></td><td style="text-align:right;">0-5-0</td><td style="text-align:center;">BOT</td><td style="text-align:left;">7-0-6</td><td style="text-align:left;"><sup>2</sup> tristana Stixxay</td></tr><tr><td style="text-align:right;">Vulcan nautilus <sup>3</sup></td><td style="text-align:right;">0-4-1</td><td style="text-align:center;">SUP</td><td style="text-align:left;">1-0-14</td><td style="text-align:left;"><sup>3</sup> rell huhi</td></tr></tbody></table>'
		);
	});

	test('table without any content in tbody', () => {
		const text = `|[^(Info)](https://www.reddit.com/r/RemindMeBot/comments/e1bko7/remindmebot_info_v21/)|[^(Custom)](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=Reminder&message=%5BLink%20or%20message%20inside%20square%20brackets%5D%0A%0ARemindMe%21%20Time%20period%20here)|[^(Your Reminders)](https://www.reddit.com/message/compose/?to=RemindMeBot&subject=List%20Of%20Reminders&message=MyReminders%21)|[^(Feedback)](https://www.reddit.com/message/compose/?to=Watchful1&subject=RemindMeBot%20Feedback)|
|-|-|-|-|`;

		const htmlResult = converter(text);
		expect(htmlResult).toBe(
			'<table><thead><tr><th scope="col"><a href="https://www.reddit.com/r/RemindMeBot/comments/e1bko7/remindmebot_info_v21/" rel="noopener nofollow ugc"><sup>Info</sup></a></th><th scope="col"><a href="https://www.reddit.com/message/compose/?to=RemindMeBot&amp;subject=Reminder&amp;message=%5BLink%20or%20message%20inside%20square%20brackets%5D%0A%0ARemindMe%21%20Time%20period%20here" rel="noopener nofollow ugc"><sup>Custom</sup></a></th><th scope="col"><a href="https://www.reddit.com/message/compose/?to=RemindMeBot&amp;subject=List%20Of%20Reminders&amp;message=MyReminders%21" rel="noopener nofollow ugc"><sup>Your Reminders</sup></a></th><th scope="col"><a href="https://www.reddit.com/message/compose/?to=Watchful1&amp;subject=RemindMeBot%20Feedback" rel="noopener nofollow ugc"><sup>Feedback</sup></a></th></tr></thead><tbody></tbody></table>'
		);
	});

	test('table with missing | in alignment section', () => {
		const text = `|#|Match|PST|EST|CET|KST
:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:
|1|VIT vs MAD|9:00 AM|12:00 PM|18:00|01:00
|2|AST vs FNC|12:00 PM|3:00 PM|21:00|04:00`;

		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			'<table><thead><tr><th style="text-align:center;" scope="col">#</th><th style="text-align:center;" scope="col">Match</th><th style="text-align:center;" scope="col">PST</th><th style="text-align:center;" scope="col">EST</th><th style="text-align:center;" scope="col">CET</th><th style="text-align:center;" scope="col">KST</th></tr></thead><tbody><tr><td style="text-align:center;">1</td><td style="text-align:center;">VIT vs MAD</td><td style="text-align:center;">9:00 AM</td><td style="text-align:center;">12:00 PM</td><td style="text-align:center;">18:00</td><td style="text-align:center;">01:00</td></tr><tr><td style="text-align:center;">2</td><td style="text-align:center;">AST vs FNC</td><td style="text-align:center;">12:00 PM</td><td style="text-align:center;">3:00 PM</td><td style="text-align:center;">21:00</td><td style="text-align:center;">04:00</td></tr></tbody></table>'
		);
	});
});
