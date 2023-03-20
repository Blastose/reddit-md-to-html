import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original u rule to output <strong> tags instead of <u> tags
export const u: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.u, {
	html: function (node, output, state) {
		return SimpleMarkdown.htmlTag('strong', output(node.content, state));
	} satisfies SimpleMarkdownRule['html']
});
