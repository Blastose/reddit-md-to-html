import SimpleMarkdown, { blockRegex } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// Modifies original blockQuote rule to not match >!, since >! !<
// is used for spoiler text
export const blockQuote: SimpleMarkdownRule = Object.assign(
	{},
	SimpleMarkdown.defaultRules.blockQuote,
	{
		match: blockRegex(/^( *>(?!!)[^\n]+(\n[^\n]+)*\n*)+\n{2,}/)
	}
);
