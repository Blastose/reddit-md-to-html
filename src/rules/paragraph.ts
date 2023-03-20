import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original paragraph rule to output <p> tags instead of <div> tags
// Also converts &#x200b; to its unicode representation
export const paragraph: SimpleMarkdownRule = Object.assign(
	{},
	SimpleMarkdown.defaultRules.paragraph,
	{
		html: function (node, output, state) {
			return SimpleMarkdown.htmlTag('p', output(node.content, state));
		} satisfies SimpleMarkdown.HtmlNodeOutput
	}
);
