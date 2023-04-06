import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

const LINK_INSIDE = '(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*';
// Modified from original to include `(` and `)` for link titles
const LINK_HREF_AND_TITLE =
	'\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+[\'"(]([\\s\\S]*?)[\'")])?\\s*';

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

		return SimpleMarkdown.htmlTag('a', output(node.content, state), attributes);
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
