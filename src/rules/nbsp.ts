import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

export const nbsp: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.hr.order - 0.5,
	match: SimpleMarkdown.blockRegex(/^(&nbsp;)(?:\n*)/),
	parse: function (capture) {
		return { content: capture[1] };
	},
	html: function (node) {
		return SimpleMarkdown.htmlTag('p', node.content);
	}
};
