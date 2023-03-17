import SimpleMarkdown, { htmlTag } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// Modifies original paragraph rule to output <p> tags instead of <div> tags
// Also converts &#x200b; to its unicode representation
export const paragraph: SimpleMarkdownRule = Object.assign(
	{},
	SimpleMarkdown.defaultRules.paragraph,
	{
		html: function (node, output, state) {
			if (node.content.length === 2) {
				if (node.content[0].content === '&nbsp' && node.content[1].content === ';') {
					return htmlTag('p', '&nbsp;');
				}
			} else if (node.content.length === 3) {
				if (
					node.content[0].content === '&' &&
					node.content[1].content === '#x200b' &&
					node.content[2].content === ';'
				) {
					return htmlTag('p', '​');
				}
			}

			return htmlTag('p', output(node.content, state));
		} as SimpleMarkdownRule['html']
	}
);
