import { spoiler } from './rules/spoiler';
import { superscript } from './rules/superscript';
import { paragraph } from './rules/paragraph';
import { heading } from './rules/heading';
import { blockQuote } from './rules/blockQuote';
import { brBackslash } from './rules/brBackslash';
import { u } from './rules/u';
import { redditlink } from './rules/redditlink';
import { userlink } from './rules/userlink';
import { link } from './rules/link';
import { autolink } from './rules/autolink';
import { url } from './rules/url';
import SimpleMarkdown from 'simple-markdown';

const rules = Object.assign({}, SimpleMarkdown.defaultRules, {
	spoiler,
	superscript,
	brBackslash,
	redditlink,
	userlink,
	paragraph,
	heading,
	blockQuote,
	u,
	link,
	autolink,
	url
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
