import SimpleMarkdown, { htmlTag, inlineRegex } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// TODO: regex may need .* instead of \w+ to match the . at the end of ^lakjd.
export const superscript: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.blockQuote.order - 0.5,
	match: inlineRegex(/^\^([^\s|^]+)/),
	parse: function (capture, parse, state) {
		console.log(capture);
		return {
			content: parse(capture[1] ?? capture[2], state)
		};
	},
	html: function (node, output, state) {
		return htmlTag('sup', output(node.content, state));
	}
};
