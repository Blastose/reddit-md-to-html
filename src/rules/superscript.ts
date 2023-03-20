import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

export const superscript: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.blockQuote.order - 0.5,
	match: SimpleMarkdown.inlineRegex(/^\^\(([^)]+)\)|^\^([^\s^]+)/),
	parse: function (capture, parse, state) {
		return {
			content: parse(capture[1] ?? capture[2], state)
		};
	},
	html: function (node, output, state) {
		return SimpleMarkdown.htmlTag('sup', output(node.content, state));
	}
};
