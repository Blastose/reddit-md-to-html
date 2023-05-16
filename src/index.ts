import { spoiler } from './rules/spoiler.js';
import { superscript } from './rules/superscript.js';
import { paragraph } from './rules/paragraph.js';
import { heading } from './rules/heading.js';
import { lheading } from './rules/lheading.js';
import { blockQuote } from './rules/blockQuote.js';
import { brBackslash } from './rules/brBackslash.js';
import { u } from './rules/u.js';
import { redditlink } from './rules/redditlink.js';
import { nonOrderedList } from './rules/nonOrderedList.js';
import { htmlEntities } from './rules/htmlEntities.js';
import { link, linkBackwards, redditImageLink } from './rules/link.js';
import { autolink } from './rules/autolink.js';
import { url, redditImageUrl } from './rules/url.js';
import { list } from './rules/list.js';
import { text } from './rules/text.js';
import { hr } from './rules/hr.js';
import { table, nptable } from './rules/table.js';
import { fence } from './rules/fence.js';
import { codeBlock } from './rules/codeBlock.js';
import { image, redditImage } from './rules/image.js';
import { reflink } from './rules/reflink.js';
import { strong } from './rules/strong.js';
import { def } from './rules/def.js';
import { Options } from './options.js';
import SimpleMarkdown from 'simple-markdown';

const rules = Object.assign({}, SimpleMarkdown.defaultRules, {
	spoiler,
	superscript,
	brBackslash,
	redditlink,
	nonOrderedList,
	htmlEntities,
	paragraph,
	heading,
	lheading,
	blockQuote,
	u,
	link,
	linkBackwards,
	redditImageLink,
	autolink,
	url,
	redditImageUrl,
	list,
	text,
	hr,
	table,
	nptable,
	fence,
	codeBlock,
	image,
	redditImage,
	reflink,
	def,
	strong
});

const parser = SimpleMarkdown.parserFor(rules);
export const parse = function (source: string, options?: Options) {
	const blockSource = source + '\n\n';
	return parser(blockSource, { inline: false, options });
};

export const htmlOutput: SimpleMarkdown.Output<string> = SimpleMarkdown.outputFor(rules, 'html');

export const converter = (text: string, options?: Options) => {
	return htmlOutput(parse(text, options));
};
