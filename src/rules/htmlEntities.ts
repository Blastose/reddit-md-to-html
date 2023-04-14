import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

const htmlEntitiesRegex = /^&#?[^;&\s<>]+;/i;

export const htmlEntities: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.hr.order - 0.5,
	match: SimpleMarkdown.inlineRegex(htmlEntitiesRegex),
	parse: function (capture) {
		return { content: capture[0] };
	},
	html: function (node) {
		return node.content;
	}
};
