import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original image rule to use images from media_metadata if present
// and ignore normal md images
export const image: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.image, {
	parse: function (capture, _parse, state) {
		if (!state.options?.media_metadata || !state.options?.media_metadata[capture[2]]) {
			return {
				rawText: capture[0]
			};
		}

		const source = state.options.media_metadata[capture[2]].s;

		const image = {
			alt: capture[1],
			target: SimpleMarkdown.unescapeUrl(source.u),
			title: capture[3],
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

		return SimpleMarkdown.htmlTag('img', '', attributes, false);
	} satisfies SimpleMarkdownRule['html']
});
