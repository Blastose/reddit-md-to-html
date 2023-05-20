import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original heading rule to support a new block on the next line
export const heading: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.heading, {
	match: SimpleMarkdown.blockRegex(/^ {0,3}(#{1,6}) *([^\n]*?) *#* *(?:\n *)*\n/),
	html: function (node, output, state) {
		if (node.content.length === 0) {
			return '';
		}
		return SimpleMarkdown.htmlTag('h' + node.level, output(node.content, state));
	} satisfies SimpleMarkdownRule['html']
});
