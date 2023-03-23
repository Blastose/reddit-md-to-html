import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original url regex to include www.
export const urlRegex = /^((?:https?:\/\/|www\.)[^\s<]+[^<.,:;"')\]\s])/;

// Modifies original url rule to ignore urls already parsed by the link rule
export const url: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.url, {
	match: function (source, state, prevCapture) {
		if (state.link) {
			return null;
		}
		return SimpleMarkdown.inlineRegex(urlRegex)(source, state, prevCapture);
	} satisfies SimpleMarkdown.MatchFunction
});
