import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original codeBlock rule to not require 2+ new lines after
export const codeBlock: SimpleMarkdownRule = Object.assign(
	{},
	SimpleMarkdown.defaultRules.codeBlock,
	{
		match: SimpleMarkdown.blockRegex(
			/^(?: {4}[^\n]+\n*)+(?:\n *)*\n/
		) satisfies SimpleMarkdown.MatchFunction
	}
);
