import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original text rule to not output backslashes from urls
// Also modifies the match function to not only capture text before `/`
// This is used for matching redditlinks like `r/programing` so the `r`
// is not captured before the rest of the link
export const text: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.text, {
	match: SimpleMarkdown.anyScopeRegex(
		/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+(?::|\/)\S|$)/
	) satisfies SimpleMarkdown.MatchFunction,
	html: function (node) {
		if (node.content.match(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/)) {
			node.content = node.content.replace(/\\/g, '');
		}

		return SimpleMarkdown.sanitizeText(node.content);
	} satisfies SimpleMarkdown.HtmlNodeOutput
});
