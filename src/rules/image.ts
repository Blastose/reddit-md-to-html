import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';
import { MediaMetadataImage, MediaMetadataGif } from '../index.js';

// Modifies original image rule to use images from media_metadata if present
// and ignore normal md images
export const image: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.image, {
	parse: function (capture, _parse, state) {
		if (
			!state.options?.media_metadata ||
			!state.options?.media_metadata[capture[2]] ||
			(state.options.media_metadata[capture[2]].e !== 'Image' &&
				state.options.media_metadata[capture[2]].e !== 'AnimatedImage')
		) {
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
			height: source.y
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

		if (node.title) {
			const captionHtml = SimpleMarkdown.htmlTag('p', node.title);
			const imageHtml = SimpleMarkdown.htmlTag('img', '', attributes, false);
			return `${imageHtml}${captionHtml}`;
		}

		return SimpleMarkdown.htmlTag('img', '', attributes, false);
	} satisfies SimpleMarkdownRule['html']
});
