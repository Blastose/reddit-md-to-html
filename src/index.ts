import { spoiler } from './rules/spoiler';
import { superscript } from './rules/superscript';
import { paragraph } from './rules/paragraph';
import { heading } from './rules/heading';
import { blockQuote } from './rules/blockQuote';
import { brBackslash } from './rules/brBackslash';
import SimpleMarkdown from 'simple-markdown';

const rules = Object.assign({}, SimpleMarkdown.defaultRules, {
	spoiler,
	superscript,
	brBackslash,
	paragraph,
	heading,
	blockQuote
});

const parser = SimpleMarkdown.parserFor(rules);
export const parse = function (source: string) {
	const blockSource = source + '\n\n';
	return parser(blockSource, { inline: false });
};

export const htmlOutput: SimpleMarkdown.Output<string> = SimpleMarkdown.outputFor(rules, 'html');

export const converter = (text: string) => {
	return htmlOutput(parser(text));
};
