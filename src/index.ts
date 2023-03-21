import { spoiler } from './rules/spoiler.js';
import { superscript } from './rules/superscript.js';
import { paragraph } from './rules/paragraph.js';
import { heading } from './rules/heading.js';
import { blockQuote } from './rules/blockQuote.js';
import { brBackslash } from './rules/brBackslash.js';
import { u } from './rules/u.js';
import { redditlink } from './rules/redditlink.js';
import { userlink } from './rules/userlink.js';
import { nonOrderedList } from './rules/nonOrderedList.js';
import { nbsp } from './rules/nbsp.js';
import { zeroWidthSpace } from './rules/zeroWidthSpace.js';
import { link } from './rules/link.js';
import { autolink } from './rules/autolink.js';
import { url } from './rules/url.js';
import { list } from './rules/list.js';
import { text } from './rules/text.js';
import { hr } from './rules/hr.js';
import { table } from './rules/table.js';
import { fence } from './rules/fence.js';
import SimpleMarkdown from 'simple-markdown';

const rules = Object.assign({}, SimpleMarkdown.defaultRules, {
	spoiler,
	superscript,
	brBackslash,
	redditlink,
	userlink,
	nonOrderedList,
	nbsp,
	zeroWidthSpace,
	paragraph,
	heading,
	blockQuote,
	u,
	link,
	autolink,
	url,
	list,
	text,
	hr,
	table,
	fence
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
