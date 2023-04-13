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
});
