import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

export const zeroWidthSpace: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.hr.order - 0.5,
	match: SimpleMarkdown.blockRegex(/^(&#x200b;)(?:\n*)/i),
	parse: function () {
		return {};
	},
	html: function () {
		return SimpleMarkdown.htmlTag('p', '​');
	}
};
