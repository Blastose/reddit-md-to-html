import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// Modifies original url rule to ignore urls already parsed by the link rule
export const url: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.url, {
	match: function (source, state, prevCapture) {
		if (state.link) {
			return null;
		}
		return SimpleMarkdown.defaultRules.url.match(source, state, prevCapture);
	} satisfies SimpleMarkdown.MatchFunction
});
