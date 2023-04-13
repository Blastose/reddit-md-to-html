import { describe, test, expect } from 'vitest';
import { converter } from '../src/index.js';

describe('image', () => {
	test('normal image is ignored', () => {
		const htmlResult = converter('![image](/image.png)');

		expect(htmlResult).toBe('<p>![image](/image.png)</p>');
	});

	test('reddit emoji image', () => {
		const media_metadata = {
			'emote|t5_3p20d|14001': {
				status: 'valid',
				e: 'Image',
				m: 'image/png',
				s: {
					y: 60,
					x: 60,
					u: 'https://reddit-econ-prod-assets-permanent.s3.amazonaws.com/asset-manager/t5_3p20d/k8tRXVaBjn.png'
				},
				t: 'sticker',
				id: 'emote|t5_3p20d|14001'
			} as const
		};

		const htmlResult = converter('![img](emote|t5_3p20d|14001)', {
			media_metadata: media_metadata
		});

		expect(htmlResult).toBe(
			'<p><img src="https://reddit-econ-prod-assets-permanent.s3.amazonaws.com/asset-manager/t5_3p20d/k8tRXVaBjn.png" alt="img" width="60" height="60"></p>'
		);
	});

	test('reddit emoji image with text before', () => {
		const media_metadata = {
			'emote|t5_3p20d|14001': {
				status: 'valid',
				e: 'Image',
				m: 'image/png',
				s: {
					y: 20,
					x: 20,
					u: 'https://reddit-econ-prod-assets-permanent.s3.amazonaws.com/asset-manager/t5_3p20d/k8tRXVaBjn.png'
				},
				t: 'sticker',
				id: 'emote|t5_3p20d|14001'
			} as const
		};

		const htmlResult = converter('Some text before the image ![img](emote|t5_3p20d|14001)', {
			media_metadata
		});

		expect(htmlResult).toBe(
			'<p>Some text before the image <img src="https://reddit-econ-prod-assets-permanent.s3.amazonaws.com/asset-manager/t5_3p20d/k8tRXVaBjn.png" alt="img" width="20" height="20"></p>'
		);
	});

	test('reddit gif emoji', () => {
		const media_metadata = {
			'emote|free_emotes_pack|scream': {
				status: 'valid',
				e: 'AnimatedImage',
				m: 'image/gif',
				s: {
					y: 60,
					gif: 'https://reddit-meta-production.s3.amazonaws.com/public/fortnitebr/emotes/snoomoji_emotes/free_emotes_pack/scream.gif',
					x: 60
				},
				t: 'sticker',
				id: 'emote|free_emotes_pack|scream'
			} as const
		};

		const htmlResult = converter('![img](emote|free_emotes_pack|scream)', {
			media_metadata
		});

		expect(htmlResult).toBe(
			'<p><img src="https://reddit-meta-production.s3.amazonaws.com/public/fortnitebr/emotes/snoomoji_emotes/free_emotes_pack/scream.gif" alt="img" width="60" height="60"></p>'
		);
	});

	test('reddit image using ![]()', () => {
		const media_metadata = {
			'8zyvax9yjmta1': {
				status: 'valid',
				e: 'Image',
				m: 'image/jpg',
				o: [
					{
						y: 608,
						x: 1080,
						u: 'https://preview.redd.it/8zyvax9yjmta1.jpg?width=1080&blur=40&format=pjpg&auto=webp&v=enabled&s=a4aebef1d232f49a36dff0928e6eed4b8eb45f48'
					}
				],
				p: [
					{
						y: 60,
						x: 108,
						u: 'https://preview.redd.it/8zyvax9yjmta1.jpg?width=108&crop=smart&auto=webp&v=enabled&s=17955572ef6009bd1f80033178ef25ebb3a30554'
					},
					{
						y: 121,
						x: 216,
						u: 'https://preview.redd.it/8zyvax9yjmta1.jpg?width=216&crop=smart&auto=webp&v=enabled&s=2c285a0adb25947e16c97709d4f0adfc44ade9a4'
					},
					{
						y: 180,
						x: 320,
						u: 'https://preview.redd.it/8zyvax9yjmta1.jpg?width=320&crop=smart&auto=webp&v=enabled&s=7fd84c82fb42b4c446dfeba823da2378ac5fe2c5'
					},
					{
						y: 360,
						x: 640,
						u: 'https://preview.redd.it/8zyvax9yjmta1.jpg?width=640&crop=smart&auto=webp&v=enabled&s=27e01b52c0071d37564c76bbfd6dc866000cbc3d'
					},
					{
						y: 540,
						x: 960,
						u: 'https://preview.redd.it/8zyvax9yjmta1.jpg?width=960&crop=smart&auto=webp&v=enabled&s=ae017eb0c1040cb08dddb00d5835f4a820bfc5a9'
					},
					{
						y: 608,
						x: 1080,
						u: 'https://preview.redd.it/8zyvax9yjmta1.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=1826db1b9e940f7988b53dfaaa83bed7e75c9c29'
					}
				],
				s: {
					y: 608,
					x: 1080,
					u: 'https://preview.redd.it/8zyvax9yjmta1.jpg?width=1080&format=pjpg&auto=webp&v=enabled&s=77d073a823d0cb6fdd2f685b61bb41f9edd2f15c'
				},
				id: '8zyvax9yjmta1'
			} as const
		};

		const htmlResult = converter('![img](8zyvax9yjmta1)', {
			media_metadata
		});
		expect(htmlResult).toBe(
			'<div class="reddit-image-container"><a href="https://preview.redd.it/8zyvax9yjmta1.jpg?width=1080&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=77d073a823d0cb6fdd2f685b61bb41f9edd2f15c" rel="noopener nofollow ugc" target="_blank"><img src="https://preview.redd.it/8zyvax9yjmta1.jpg?width=1080&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=77d073a823d0cb6fdd2f685b61bb41f9edd2f15c" alt="img" width="1080" height="608" class="reddit-image"></a></div>'
		);
	});

	test('reddit image with caption using ![]()', () => {
		const media_metadata = {
			ibm0aw9yjmta1: {
				status: 'valid',
				e: 'Image',
				m: 'image/jpg',
				s: {
					y: 192,
					x: 175,
					u: 'https://preview.redd.it/ibm0aw9yjmta1.jpg?width=175&format=pjpg&auto=webp&v=enabled&s=e53cef5ba5cc5956de2f6a12dab88e844631f24a'
				},
				id: 'ibm0aw9yjmta1'
			} as const
		};

		const htmlResult = converter(
			`![img](ibm0aw9yjmta1 " "Mizuki, Ecological Fountains"
"Perfect creatures near the evolutionary singularity, counselors and leaders of We Many, "firstborn of the young", seaborn",  ")`,
			{
				media_metadata
			}
		);

		expect(htmlResult)
			.toBe(`<div class="reddit-image-container"><a href="https://preview.redd.it/ibm0aw9yjmta1.jpg?width=175&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=e53cef5ba5cc5956de2f6a12dab88e844631f24a" rel="noopener nofollow ugc" target="_blank"><img src="https://preview.redd.it/ibm0aw9yjmta1.jpg?width=175&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=e53cef5ba5cc5956de2f6a12dab88e844631f24a" alt="img" title=" &quot;Mizuki, Ecological Fountains&quot;
&quot;Perfect creatures near the evolutionary singularity, counselors and leaders of We Many, &quot;firstborn of the young&quot;, seaborn&quot;,  " width="175" height="192" class="reddit-image"></a></div><p class="image-caption"> "Mizuki, Ecological Fountains"
"Perfect creatures near the evolutionary singularity, counselors and leaders of We Many, "firstborn of the young", seaborn",  </p>`);
	});

	test('reddit gif', () => {
		const media_metadata = {
			'giphy|mKAoR36m45G00': {
				status: 'valid',
				e: 'AnimatedImage',
				m: 'image/gif',
				ext: 'https://giphy.com/gifs/mKAoR36m45G00',
				p: [
					{
						y: 105,
						x: 140,
						u: 'https://b.thumbs.redditmedia.com/60P8bYMQ_FshTb9qrPGXPv5jMeBGl7TBndt3H-SO6GU.jpg'
					}
				],
				s: {
					y: 200,
					gif: 'https://external-preview.redd.it/sidRI_MI4dTLqGQFeBYYQSGYH_IX1ufIoAtXdBiKLQU.gif?width=266&height=200&v=enabled&s=fd908df9afcfbc039a90853327cf7bc4a6b17e94',
					mp4: 'https://external-preview.redd.it/sidRI_MI4dTLqGQFeBYYQSGYH_IX1ufIoAtXdBiKLQU.gif?width=266&height=200&format=mp4&v=enabled&s=7e3d3fe2aabed8d40590bca13adae54d4a4523f7',
					x: 266
				},
				t: 'giphy',
				id: 'giphy|mKAoR36m45G00'
			} as const
		};

		const htmlResult = converter('![gif](giphy|mKAoR36m45G00)', {
			media_metadata
		});

		expect(htmlResult).toBe(
			'<div><a href="https://giphy.com/gifs/mKAoR36m45G00" rel="noopener nofollow ugc" target="_blank"><img src="https://external-preview.redd.it/sidRI_MI4dTLqGQFeBYYQSGYH_IX1ufIoAtXdBiKLQU.gif?width=266&amp;height=200&amp;v=enabled&amp;s=fd908df9afcfbc039a90853327cf7bc4a6b17e94" alt="gif" width="266" height="200" class="reddit-image"></a></div>'
		);
	});

	test('reddit image with caption using []()', () => {
		const media_metadata = {
			'8zyvax9yjmta1': {
				status: 'valid',
				e: 'Image',
				m: 'image/jpg',
				s: {
					y: 608,
					x: 1080,
					u: 'https://preview.redd.it/8zyvax9yjmta1.jpg?width=1080&format=pjpg&auto=webp&v=enabled&s=77d073a823d0cb6fdd2f685b61bb41f9edd2f15c'
				},
				id: '8zyvax9yjmta1'
			} as const
		};
		const text = `[Mizuki, the chosen one](https://preview.redd.it/8zyvax9yjmta1.jpg?width=1080&format=pjpg&auto=webp&v=enabled&s=77d073a823d0cb6fdd2f685b61bb41f9edd2f15c)`;
		const htmlResult = converter(text, { media_metadata: media_metadata });

		expect(htmlResult).toBe(
			`<div class="reddit-image-container"><a href="https://preview.redd.it/8zyvax9yjmta1.jpg?width=1080&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=77d073a823d0cb6fdd2f685b61bb41f9edd2f15c" rel="noopener nofollow ugc" target="_blank"><img src="https://preview.redd.it/8zyvax9yjmta1.jpg?width=1080&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=77d073a823d0cb6fdd2f685b61bb41f9edd2f15c" alt="img" title="Mizuki, the chosen one" width="1080" height="608" class="reddit-image"></a></div><p class="image-caption">Mizuki, the chosen one</p>`
		);
	});

	test('reddit image with using []() without media_metadata', () => {
		const text = `[Mizuki, the chosen one](https://preview.redd.it/8zyvax9yjmta1.jpg?width=1080&format=pjpg&auto=webp&v=enabled&s=77d073a823d0cb6fdd2f685b61bb41f9edd2f15c)`;
		const htmlResult = converter(text);

		expect(htmlResult).toBe(
			'<a href="https://preview.redd.it/8zyvax9yjmta1.jpg?width=1080&amp;format=pjpg&amp;auto=webp&amp;v=enabled&amp;s=77d073a823d0cb6fdd2f685b61bb41f9edd2f15c" rel="noopener nofollow ugc">Mizuki, the chosen one</a>'
		);
	});
});

// test('reddit image', () => {
// 	const media_metadata = {
// 		a: {}
// 	} as unknown as MediaMetadata;

// 	const htmlResult = converter('![img](emote|free_emotes_pack|scream)', {
// 		media_metadata
// 	});

// 	expect(htmlResult).toBe(
// 		'<p><img src="https://reddit-meta-production.s3.amazonaws.com/public/fortnitebr/emotes/snoomoji_emotes/free_emotes_pack/scream.gif" alt="img" width="60" height="60"></p>'
// 	);
// });

export interface MediaMetadata {
	[media_id: string]: MediaMetadataImage | MediaMetadataGif;
}

export interface MediaMetadataImage {
	status: 'valid';
	e: 'Image';
	m: 'image/png' | 'image/jpg';
	p?: AlbumEntry[];
	o?: AlbumEntry[];
	s: AlbumEntry;
	t: 'sticker';
	id: string;
}

export interface MediaMetadataGif {
	status: 'valid';
	e: 'AnimatedImage';
	m: 'image/gif';
	ext?: 'string';
	p?: AlbumEntry[];
	s: {
		y: number;
		gif: string;
		mp4?: string;
		x: number;
	};
	t: 'giphy' | 'sticker';
	id: string;
}

export interface AlbumEntry {
	y: number;
	x: number;
	u: string;
}
