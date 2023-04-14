import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';
import { MediaMetadataImage, MediaMetadataGif } from '../options.js';

function captureExistsInMediaMetadata(state: any, capture: any) {
	if (
		!state.options?.media_metadata ||
		!state.options?.media_metadata[capture[2]] ||
		(state.options.media_metadata[capture[2]].e !== 'Image' &&
			state.options.media_metadata[capture[2]].e !== 'AnimatedImage')
	) {
		return false;
	}
	return true;
}

// Modifies original image rule to use images from media_metadata if present
// and ignore normal md images
// Used for reddit emojis and is inline
// See redditImage for block images
export const image: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.image, {
	parse: function (capture, _parse, state) {
		if (!captureExistsInMediaMetadata(state, capture)) {
			return {
				rawText: capture[0]
			};
		}

		const metadata = state.options.media_metadata[capture[2]] as
			| MediaMetadataImage
			| MediaMetadataGif;
		const source = metadata.s;
		let sourceUrl = '';
		if (metadata.e === 'AnimatedImage') {
			sourceUrl = metadata.s.gif;
		} else if (metadata.e === 'Image') {
			sourceUrl = metadata.s.u;
		} else {
			return { rawText: capture[0] };
		}

		const image = {
			alt: capture[1],
			target: SimpleMarkdown.unescapeUrl(sourceUrl),
			title: capture[3]?.replace(/\\"/g, '"'),
			width: source.x,
			height: source.y,
			isEmoji: metadata.t === 'sticker'
		};
		return image;
	} satisfies SimpleMarkdown.ParseFunction,
	html: function (node) {
		if (node.rawText) {
			return SimpleMarkdown.sanitizeText(node.rawText);
		}

		const attributes = {
			src: SimpleMarkdown.sanitizeUrl(node.target),
			alt: node.alt,
			title: node.title,
			width: node.width,
			height: node.height
		};

		return SimpleMarkdown.htmlTag('img', '', attributes, false);
	} satisfies SimpleMarkdownRule['html']
});

// We cannot tell if the image is an emoji until we reach the parsing stage
// If the image is an emoji, it should be inline and have a <p> tag wrapper
// If the image is not an emoji, it should be block and have a <div> tag wrapper
export const redditImage: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.paragraph.order - 0.5,
	match: function (source, state, prevCapture) {
		return SimpleMarkdown.blockRegex(
			/^!\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\(\s*<?((?:\([^)]*\)|[^\s\\)!]|\\.)*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*\)\n+/
		)(source, state, prevCapture);
	},
	parse: function (capture, _parse, state) {
		if (!captureExistsInMediaMetadata(state, capture)) {
			return {
				rawText: capture[0].trimEnd()
			};
		}

		const metadata = state.options.media_metadata[capture[2]] as
			| MediaMetadataImage
			| MediaMetadataGif;
		const source = metadata.s;
		let sourceUrl = '';
		let ext: string | undefined;
		if (metadata.e === 'AnimatedImage') {
			sourceUrl = metadata.s.gif;
			ext = metadata.ext;
		} else if (metadata.e === 'Image') {
			sourceUrl = metadata.s.u;
		} else {
			return { rawText: capture[0] };
		}

		const image = {
			alt: capture[1],
			target: SimpleMarkdown.unescapeUrl(sourceUrl),
			title: capture[3]?.replace(/\\/g, ''),
			width: source.x,
			height: source.y,
			isEmoji: metadata.t === 'sticker',
			isGif: metadata.e === 'AnimatedImage',
			ext: ext
		};
		return image;
	},
	html: function (node) {
		if (node.rawText) {
			return SimpleMarkdown.htmlTag('p', SimpleMarkdown.sanitizeText(node.rawText));
		}

		const attributes = {
			src: SimpleMarkdown.sanitizeUrl(node.target),
			alt: node.alt,
			title: node.title,
			width: node.width,
			height: node.height
		};

		if (!node.isEmoji) {
			let captionHtml = '';
			if (node.title) {
				const captionAttributes = {
					class: 'image-caption'
				};
				captionHtml = SimpleMarkdown.htmlTag('p', node.title, captionAttributes);
			}
			const imageHtml = SimpleMarkdown.htmlTag(
				'img',
				'',
				{ ...attributes, class: 'reddit-image' },
				false
			);

			const anchorAttributes = {
				href: node.ext ?? SimpleMarkdown.sanitizeUrl(node.target),
				rel: 'noopener nofollow ugc',
				target: '_blank'
			};

			const anchorHtml = SimpleMarkdown.htmlTag('a', imageHtml, anchorAttributes);

			const imageHtmlWrapper = SimpleMarkdown.htmlTag('div', anchorHtml, {
				class: node.isGif ? '' : 'reddit-image-container'
			});
			return `${imageHtmlWrapper}${captionHtml}`;
		}

		// If this block was an emoji, it needs to be wrapped in a p tag like inline image emojis
		const emojiHtml = SimpleMarkdown.htmlTag('img', '', attributes, false);
		return SimpleMarkdown.htmlTag('p', emojiHtml);
	}
};
