import SimpleMarkdown, { htmlTag, sanitizeUrl, unescapeUrl } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// Modifies original link rule to add a state when parsing to tell other rules
// that the text has already been ran through the link rule
// Used to prevent double <a> tags
// Also modifies href tag output to ignore backslashes
export const link: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.link, {
	parse: function (capture, parse, state) {
		state.link = true;
		const link = {
			content: parse(capture[1], state),
			target: unescapeUrl(capture[2]),
			title: capture[3]
		};
		return link;
	} satisfies SimpleMarkdown.ParseFunction,
	html: function (node, output, state) {
		const attributes = {
			href: sanitizeUrl(node.target)?.replace(/\\/g, ''),
			title: node.title
		};

		return htmlTag('a', output(node.content, state), attributes);
	} satisfies SimpleMarkdown.HtmlNodeOutput
});
