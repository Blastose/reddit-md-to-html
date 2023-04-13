import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';
import { MediaMetadataImage } from '../index.js';

const LINK_INSIDE = '(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*';
// Modified from original to include `(` and `)` for link titles
// Modified to match spaces
const LINK_HREF_AND_TITLE =
	'\\s*<?((?:\\([^)]*\\)|[^\\\\]|\\\\.)*?)>?(?:\\s+[\'"(]([\\s\\S]*?)[\'")])?\\s*';

// Modifies original link rule to add a state when parsing to tell other rules
// that the text has already been ran through the link rule
// Used to prevent double <a> tags
// Also modifies href tag output to ignore backslashes
// Also outputs prepends https:// to of www. links
export const link: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.link, {
	match: SimpleMarkdown.inlineRegex(
		new RegExp('^\\[(' + LINK_INSIDE + ')\\]\\(' + LINK_HREF_AND_TITLE + '\\)')
	) satisfies SimpleMarkdown.MatchFunction,
	parse: function (capture, parse, state) {
		state.link = true;
		const link = {
			addTargetBlank: state.options?.addTargetBlank,
			content: parse(capture[1], state),
			target: SimpleMarkdown.unescapeUrl(capture[2]),
			title: capture[3]
		};
		state.link = false;
		return link;
	} satisfies SimpleMarkdown.ParseFunction,
	html: function (node, output, state) {
		const attributes = {
			href: SimpleMarkdown.sanitizeUrl(node.target)
				?.replace(/\\/g, '')
				.replace(/^www\./, 'https://www.'),
			title: node.title,
			rel: 'noopener nofollow ugc',
			target: node.addTargetBlank ? '_blank' : null
		};

		const anchorHtml = SimpleMarkdown.htmlTag('a', output(node.content, state), attributes);
		if (node.useParagraphWrapper) {
			return SimpleMarkdown.htmlTag('p', anchorHtml);
		}

		return anchorHtml;
	} satisfies SimpleMarkdown.HtmlNodeOutput
});

// Rule for []() links but the link and text are swapped (e.g. [link](text))
// The html output will just be the link by itself
export const linkBackwards: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.link.order - 0.5,
	match: SimpleMarkdown.inlineRegex(
		/^\[(https?:\/\/\s*<?(?:(?:\([^)]*\)|[^\s\\]|\\.)*?)>?(?:\s+['"(]([\s\S]*?)['")])?\s*)\]\((?!https?:\/\/)(?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*\)/
	),
	parse: function (capture, _parse, state) {
		return {
			addTargetBlank: state.options?.addTargetBlank,
			type: 'link',
			content: [{ type: 'text', content: capture[1] }],
			target: capture[1],
			title: undefined
		};
	},
	html: null
};

export const redditImageLink: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.heading.order - 0.5,
	match: SimpleMarkdown.blockRegex(
		new RegExp('^\\[(' + LINK_INSIDE + ')\\]\\((https:\\/\\/preview\\.redd\\.it\\/(.*)\\..*)\\)\n+')
	),
	parse: function (capture, parse, state) {
		if (
			state.options?.media_metadata &&
			state.options?.media_metadata[capture[3]] &&
			state.options.media_metadata[capture[3]].e === 'Image'
		) {
			const metadata = state.options.media_metadata[capture[3]] as MediaMetadataImage;
			return {
				type: 'redditImage',
				alt: 'img',
				target: SimpleMarkdown.unescapeUrl(metadata.s.u),
				title: capture[1],
				width: metadata.s.x,
				height: metadata.s.y
			};
		}

		// If we do not have the image in media_metadata, we just return a normal link
		const link = {
			type: 'link',
			addTargetBlank: state.options?.addTargetBlank,
			content: parse(capture[1], state),
			target: SimpleMarkdown.unescapeUrl(capture[2])
		};
		return link;
	},
	html: null
};
