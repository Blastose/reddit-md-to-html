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
			return SimpleMarkdown.inlineRegex(/^<(https?:\/[^ >]+)>/)(source, state, prevCapture);
		} satisfies SimpleMarkdown.MatchFunction,
		parse: function (capture, _parse, state) {
			return {
				addTargetBlank: state.options?.addTargetBlank,
				type: 'link',
				content: [
					{
						type: 'text',
						content: capture[1]
					}
				],
				target: capture[1]
			};
		} satisfies SimpleMarkdown.ParseFunction
	}
);
