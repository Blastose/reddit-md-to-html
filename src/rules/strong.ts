import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

export const strong: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.strong, {
	match: SimpleMarkdown.inlineRegex(
		/^\*\*((?:\\[\s\S]|[^\\])+?)\*\*/
	) satisfies SimpleMarkdown.MatchFunction
});
