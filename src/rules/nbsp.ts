import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

export const nbsp: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.hr.order - 0.5,
	match: SimpleMarkdown.inlineRegex(/^(&nbsp;)(?:\n*)/i),
	parse: function (capture) {
		return { content: capture[1] };
	},
	html: function (node) {
		return node.content;
	}
};
