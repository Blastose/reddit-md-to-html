import SimpleMarkdown, { htmlTag, inlineRegex } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

export const superscript: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.blockQuote.order - 0.5,
	match: inlineRegex(/^\^\(([^)]+)\)|^\^([^\s^]+)/),
	parse: function (capture, parse, state) {
		return {
			content: parse(capture[1] ?? capture[2], state)
		};
	},
	html: function (node, output, state) {
		return htmlTag('sup', output(node.content, state));
	}
};
