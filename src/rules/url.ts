import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';
import { MediaMetadataImage } from '../options.js';

// Modifies original url regex to include www.
export const urlRegex = /^((?:https?):\/\/|www\.)(?:[a-zA-Z0-9-]+\.?)+[^\s<]*/;

// Modifies original url rule to ignore urls already parsed by the link rule
export const url: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.url, {
	match: function (source, state, prevCapture) {
		if (state.link) {
			return null;
		}
		return SimpleMarkdown.inlineRegex(urlRegex)(source, state, prevCapture);
	} satisfies SimpleMarkdown.MatchFunction,
	parse: function (capture, _parse, state) {
		// Add backpedal logic from markedjs https://github.com/markedjs/marked/blob/7c1e114f9f7949ba4033366582d2a4ddf09e85af/lib/marked.cjs#L1058
		// See https://github.github.com/gfm/#extended-autolink-path-validation
		const backpedal = /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/;

		const initial = capture[0];
		let backpedalCapture = initial;
		let prevBackpedalCapture = backpedalCapture;
		do {
			const backpedalRegexResponse = backpedal.exec(backpedalCapture);
			if (!backpedalRegexResponse) {
				break;
			}
			prevBackpedalCapture = backpedalCapture;
			backpedalCapture = backpedalRegexResponse[0];
		} while (prevBackpedalCapture !== backpedalCapture);
		const backpedalDiff = initial.replace(backpedalCapture, '');

		return {
			addTargetBlank: state.options?.addTargetBlank,
			type: 'link',
			content: [
				{
					type: 'text',
					content: backpedalCapture
				}
			],
			target: backpedalCapture,
			title: undefined,
			backpedalDiff
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
