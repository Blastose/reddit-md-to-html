import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original codeBlock rule to not require 2+ new lines after
// Also modifies the match regext to not require text after the 4 spaces
// and ignores spaces less than 4
export const codeBlock: SimpleMarkdownRule = Object.assign(
	{},
	SimpleMarkdown.defaultRules.codeBlock,
	{
		match: SimpleMarkdown.blockRegex(
			/^(?: {4}[^\n]*\n*)+(?:\n)*\n/
		) satisfies SimpleMarkdown.MatchFunction
	}
);
