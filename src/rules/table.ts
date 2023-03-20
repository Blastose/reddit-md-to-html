import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original table rule to match loosely
// The loose match does not require `|` to be at the start of a table row
export const table: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.table, {
	match: SimpleMarkdown.blockRegex(
		/^ *(.+\|.*)\n *\|( *[-:]+[-| :]*)\n((?: *.*\|.*(?:\n|$))*)\n*/
	) satisfies SimpleMarkdown.MatchFunction
});
