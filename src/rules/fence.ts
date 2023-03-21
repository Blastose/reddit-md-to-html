import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original fence rule so the ending triple backticks only need to have at least one new line
// instead of two or more
export const fence: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.fence, {
	match: SimpleMarkdown.blockRegex(
		/^ *(`{3,}|~{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n*)+\n/
	) satisfies SimpleMarkdown.MatchFunction
});
