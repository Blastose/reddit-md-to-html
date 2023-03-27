import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original blockQuote rule to not match >!, since >! !<
// is used for spoiler text
// Also modifies match regex to match empty text after `>`
// and matches empty spaces after
export const blockQuote: SimpleMarkdownRule = Object.assign(
	{},
	SimpleMarkdown.defaultRules.blockQuote,
	{
		match: SimpleMarkdown.blockRegex(
			/^( {0,3}>(?!!).*?(?=\n\n|\n +\n))(?:\n| )*/s
		) satisfies SimpleMarkdown.MatchFunction
	}
);
