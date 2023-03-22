import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Rule for both /?r/ and /?u/ links
export const redditlink: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.url.order - 0.5,
	match: function (source, state, prevCapture) {
		if (state.link) {
			return null;
		}
		if (prevCapture.length !== 0 && prevCapture[prevCapture.length - 1] !== ' ') return null;
		return source.match(/^\/?r\/\w{2,24}|^\/?u\/\w{2,20}/);
	},
	parse: function (capture) {
		let target = '';
		if (!capture[0].startsWith('/')) {
			target = `/${capture[0]}`;
		} else {
			target = capture[0];
		}

		return {
			type: 'link',
			content: [{ type: 'text', content: capture[0] }],
			target: target,
			title: undefined
		};
	},
	html: null
};
