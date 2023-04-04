import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original reflink rule to not match when a link is the second bracket
// like [] []()
export const reflink: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.reflink, {
	match: SimpleMarkdown.inlineRegex(
		/^\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\s*\[([^\]]*)\](?!\()/
	) satisfies SimpleMarkdown.MatchFunction
});
