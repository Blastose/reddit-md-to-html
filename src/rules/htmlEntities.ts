import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

const htmlEntitiesRegex = /^&#?[^;&\s<>]+;/i;
const htmlEntitiesRegexBlock = /^(&#?[^;&\s<>]+;)\n*/i;

export const htmlEntitiesBlock: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.heading.order - 0.5,
	match: SimpleMarkdown.blockRegex(htmlEntitiesRegexBlock),
	parse: function (capture) {
		return { type: 'paragraph', content: [{ content: capture[1], type: 'htmlEntities' }] };
	},
	html: null
};

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
