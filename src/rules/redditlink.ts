import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Rule for both /?r/ and /?u/ links
export const redditlink: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.url.order - 0.5,
	match: function (source, state, prevCapture) {
		if (state.link) {
			return null;
		}

		// This following if block is to prevent redditlink from matching when
		// there the link is inside a word (e.g. the r/parser in conerter/parser).
		// However, we do want to match a redditlink if the previous capture ended with a new line
		// since it should be the start of a new line
		// The reason we are using state.prevCapture is that prevCapture only contains
		// what was previous, while state.prevCapture is an array containing the entire line,
		// not only what was matched
		// We test a regex match on prevCapture since if the character before is not a letter (e.g. a `(`),
		// then it should match
		// We also test a regex match if the source starts does not start with /r|u/
		// since we need to match those
		if (
			state.prevCapture &&
			state.prevCapture.length > 0 &&
			state.prevCapture[0][state.prevCapture[0].length - 1] !== '\n' &&
			prevCapture.length !== 0 &&
			prevCapture[prevCapture.length - 1] !== ' ' &&
			/^.*\w+/.test(prevCapture) &&
			!/^\/r|u\//.test(source)
		) {
			return null;
		}
		return SimpleMarkdown.inlineRegex(/^\/?r\/\w+|^\/?u\/[A-Za-z0-9_-]+/)(
			source,
			state,
			prevCapture
		);
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
