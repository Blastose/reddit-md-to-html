import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original lheading rule to only require one new line
export const lheading: SimpleMarkdownRule = Object.assign(
	{},
	SimpleMarkdown.defaultRules.lheading,
	{
		match: SimpleMarkdown.blockRegex(
			/^(?!```)([^\n]+)\n *(=|-){3,} *(?:\n *)+/
		) satisfies SimpleMarkdown.MatchFunction
	}
);
