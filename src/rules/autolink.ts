import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original autolink rule to ignore urls already parsed by the link rule
export const autolink: SimpleMarkdownRule = Object.assign(
	{},
	SimpleMarkdown.defaultRules.autolink,
	{
		match: function (source, state, prevCapture) {
			if (state.link) {
				return null;
			}
			return SimpleMarkdown.defaultRules.autolink.match(source, state, prevCapture);
		} satisfies SimpleMarkdown.MatchFunction
	}
);
