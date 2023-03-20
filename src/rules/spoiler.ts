import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

export const spoiler: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.blockQuote.order - 0.5,
	match: SimpleMarkdown.inlineRegex(/^>!\s*(.*?)\s*!</),
	parse: function (capture, parse, state) {
		return {
			content: parse(capture[1], state)
		};
	},
	html: function (node, output, state) {
		return SimpleMarkdown.htmlTag('span', output(node.content, state), { class: 'spoiler' });
	}
};
