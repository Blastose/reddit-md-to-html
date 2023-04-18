import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

export const superscript: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.blockQuote.order - 0.5,
	match: function (source, state, prevCapture) {
		// If the superscript is in a table, we need to use a modified verision of the
		// match regex to stop matching at `|` (table separator)
		if (state.isTable) {
			return SimpleMarkdown.inlineRegex(/^\^+\(([^)]+)\)|^\^+([^\s^|]+)/)(
				source,
				state,
				prevCapture
			);
		}
		return SimpleMarkdown.inlineRegex(/^\^+(\[[^\]]*\]\([^ ]*\))|^\^+\(([^)]+)\)|^\^+([^\s^]+)/)(
			source,
			state,
			prevCapture
		);
	},
	parse: function (capture, parse, state) {
		return {
			content: parse(capture[1] ?? capture[2] ?? capture[3], state)
		};
	},
	html: function (node, output, state) {
		return SimpleMarkdown.htmlTag('sup', output(node.content, state));
	}
};
