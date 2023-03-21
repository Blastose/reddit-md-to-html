import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original paragraph rule to output <p> tags instead of <div> tags
export const paragraph: SimpleMarkdownRule = Object.assign(
	{},
	SimpleMarkdown.defaultRules.paragraph,
	{
		// The regex is modified from the original to stop at ``` (3 backticks)
		// This is so ``` code blocks without 2 two lines before do not get matched with
		// the preceding paragraph
		match: SimpleMarkdown.blockRegex(
			/^((?:[^\n]|\n(?! *\n)(?!```))+)(?:\n *)*\n/
		) satisfies SimpleMarkdown.MatchFunction,
		html: function (node, output, state) {
			return SimpleMarkdown.htmlTag('p', output(node.content, state));
		} satisfies SimpleMarkdown.HtmlNodeOutput
	}
);
