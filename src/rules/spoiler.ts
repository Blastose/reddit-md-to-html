import SimpleMarkdown, { htmlTag, inlineRegex } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// TODO: not sure if match needs to be `blockRegex` or `inlineRegex`
export const spoiler: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.blockQuote.order - 0.5,
	match: inlineRegex(/^>!\s*(.*?)\s*!</),
	parse: function (capture, parse, state) {
		return {
			content: parse(capture[1], state)
		};
	},
	html: function (node, output, state) {
		return htmlTag('span', output(node.content, state), { class: 'spoiler' });
	}
};
