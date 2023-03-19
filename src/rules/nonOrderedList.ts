import SimpleMarkdown, { blockRegex, htmlTag } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// Rule to match `[#].` before the list rule so that they are not
// parsed as ordered lists
export const nonOrderedList: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.list.order - 0.5,
	match: function (source, state, prevCapture) {
		if (state.notOrderedList) {
			return null;
		}
		return blockRegex(/^((?!1\.)\d+\.[^\n]+)\n+/)(source, state, prevCapture);
	},
	parse: function (capture, parse, state) {
		state.notOrderedList = true;
		return {
			content: parse(capture[1], state)
		};
	},
	html: function (node, output, state) {
		return htmlTag('p', output(node.content, state));
	}
};
