import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original link rule to add a state when parsing to tell other rules
// that the text has already been ran through the link rule
// Used to prevent double <a> tags
// Also modifies href tag output to ignore backslashes
// Also outputs prepends https:// to of www. links
export const link: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.link, {
	parse: function (capture, parse, state) {
		state.link = true;
		const link = {
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
			rel: 'noopener nofollow ugc'
		};

		return SimpleMarkdown.htmlTag('a', output(node.content, state), attributes);
	} satisfies SimpleMarkdown.HtmlNodeOutput
});
