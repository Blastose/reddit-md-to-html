import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

export const userlink: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.url.order - 0.5,
	match: function (source, state) {
		if (state.link) {
			return null;
		}
		return source.match(/^\/u\/\w{2,}|^u\/\w{2,}/);
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
