import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original reflink rule to
export const reflink: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.reflink, {
	match: function (source, state, prevCapture) {
		const LINK_INSIDE = '(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*';
		return SimpleMarkdown.inlineRegex(
			new RegExp(
				// The first [part] of the link
				'^\\[(' +
					LINK_INSIDE +
					')\\]' +
					// The [ref] target of the link
					'\\s*\\[([^\\]]*)\\](?!(.*))'
			)
		)(source, state, prevCapture);
	} satisfies SimpleMarkdown.MatchFunction
});
