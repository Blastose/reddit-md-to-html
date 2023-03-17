import SimpleMarkdown, { htmlTag } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// Modifies original paragraph rule to output <p> tags instead of <div> tags
export const paragraph: SimpleMarkdownRule = Object.assign(
	{},
	SimpleMarkdown.defaultRules.paragraph,
	{
		html: function (node, output, state) {
			return htmlTag('p', output(node.content, state));
		} as SimpleMarkdownRule['html']
	}
);
