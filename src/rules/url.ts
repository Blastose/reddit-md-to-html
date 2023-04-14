import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';
import { MediaMetadataImage } from '../index.js';

// Modifies original url regex to include www.
export const urlRegex = /^((?:https?:\/\/|www\.)[^\s<]+[^<.,:;"')\]\s])/;

// Modifies original url rule to ignore urls already parsed by the link rule
export const url: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.url, {
	match: function (source, state, prevCapture) {
		if (state.link) {
			return null;
		}
		return SimpleMarkdown.inlineRegex(urlRegex)(source, state, prevCapture);
	} satisfies SimpleMarkdown.MatchFunction,
	parse: function (capture, _parse, state) {
		return {
			addTargetBlank: state.options?.addTargetBlank,
			type: 'link',
			content: [
				{
					type: 'text',
					content: capture[1]
				}
			],
			target: capture[1],
			title: undefined
		};
	} satisfies SimpleMarkdown.ParseFunction
});

export const redditImageUrl: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.heading.order - 0.5,
	match: SimpleMarkdown.blockRegex(/^(https:\/\/preview\.redd\.it\/(.*)\..*)\n*/),
	parse: function (capture, _parse, state) {
		if (
			state.options?.media_metadata &&
			state.options?.media_metadata[capture[2]] &&
			state.options.media_metadata[capture[2]].e === 'Image'
		) {
			const metadata = state.options.media_metadata[capture[2]] as MediaMetadataImage;
			return {
				type: 'redditImage',
				alt: 'img',
				target: SimpleMarkdown.unescapeUrl(metadata.s.u),
				title: undefined,
				width: metadata.s.x,
				height: metadata.s.y
			};
		}

		// If we do not have the image in media_metadata, we just return a normal link
		const link = {
			type: 'link',
			addTargetBlank: state.options?.addTargetBlank,
			content: [
				{
					type: 'text',
					content: capture[1]
				}
			],
			target: capture[1],
			title: undefined,
			useParagraphWrapper: true
		};
		return link;
	},
	html: null
};
