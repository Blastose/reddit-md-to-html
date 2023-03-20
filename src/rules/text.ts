import SimpleMarkdown, { sanitizeText } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// Modifies original text rule to not output backslashes from urls
export const text: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.text, {
	html: function (node) {
		if (node.content.match(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/)) {
			node.content = node.content.replace(/\\/g, '');
		}

		return sanitizeText(node.content);
	} satisfies SimpleMarkdown.HtmlNodeOutput
});
