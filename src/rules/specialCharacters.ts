import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

const characterMap = {
	'&#x200b;': '​',
	'&nbsp;': '&nbsp;',
	'&#32;': ' '
};

const charactersJoined = Object.keys(characterMap).join('|');
const specialCharactersRegex = new RegExp(`^(${charactersJoined})(?:\n*)`, 'i');

export const specialCharacters: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.hr.order - 0.5,
	match: SimpleMarkdown.inlineRegex(specialCharactersRegex),
	parse: function (capture) {
		return { content: capture[1] };
	},
	html: function (node) {
		return characterMap[node.content.toLowerCase() as keyof typeof characterMap];
	}
};
