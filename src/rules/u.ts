import SimpleMarkdown, { htmlTag } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// Modifies original u rule to output <strong> tags instead of <u> tags
export const u: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.u, {
	html: function (node, output, state) {
		return htmlTag('strong', output(node.content, state));
	} as SimpleMarkdownRule['html']
});
