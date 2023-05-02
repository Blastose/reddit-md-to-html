import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';
import { backtrackParentheses } from '../util.js';

export const superscript: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.blockQuote.order - 0.5,
	match: function (source, state, prevCapture) {
		let match = SimpleMarkdown.inlineRegex(/^\^+(?:(\[[^\]]*\]\([^ ]*\))|\((.+)\)|([^\s^]+))/)(
			source,
			state,
			prevCapture
		);

		// If the superscript is in a table, we need to use a modified verision of the
		// match regex to stop matching at `|` (table separator)
		if (state.isTable) {
			match = SimpleMarkdown.inlineRegex(/^\^+(?:\((.+)\)|([^\s^|]+))/)(source, state, prevCapture);
		}

		if (!match) {
			return null;
		}

		// The regex cannot detect if the parentheses are unbalanced, so we may need to backtrack
		// if the regex has matched too far
		const backtrackMatch = backtrackParentheses(match[0], match[1] ?? match[2] ?? match[3]);

		if (backtrackMatch) {
			return backtrackMatch;
		}

		return match;
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
