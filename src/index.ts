import { spoiler } from './rules/spoiler.js';
import { superscript } from './rules/superscript.js';
import { paragraph } from './rules/paragraph.js';
import { heading } from './rules/heading.js';
import { blockQuote } from './rules/blockQuote.js';
import { brBackslash } from './rules/brBackslash.js';
import { u } from './rules/u.js';
import { redditlink } from './rules/redditlink.js';
import { nonOrderedList } from './rules/nonOrderedList.js';
import { specialCharacters } from './rules/specialCharacters.js';
import { link } from './rules/link.js';
import { autolink } from './rules/autolink.js';
import { url } from './rules/url.js';
import { list } from './rules/list.js';
import { text } from './rules/text.js';
import { hr } from './rules/hr.js';
import { table } from './rules/table.js';
import { fence } from './rules/fence.js';
import { codeBlock } from './rules/codeBlock.js';
import { image } from './rules/image.js';
import { reflink } from './rules/reflink.js';
import SimpleMarkdown from 'simple-markdown';

export interface Options {
	addTargetBlank?: boolean;
	media_metadata?: {
		[media_id: string]: {
			status: string;
			e: string | 'Image';
			m: string | 'image/png';
			s: {
				y: number;
				x: number;
				u: string;
			};
			t?: string | 'sticker';
			id: string;
		};
	};
}

const rules = Object.assign({}, SimpleMarkdown.defaultRules, {
	spoiler,
	superscript,
	brBackslash,
	redditlink,
	nonOrderedList,
	specialCharacters,
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
	fence,
	codeBlock,
	image,
	reflink
});

const parser = SimpleMarkdown.parserFor(rules);
export const parse = function (source: string, options?: Options) {
	const blockSource = source + '\n\n';
	return parser(blockSource, { inline: false, options });
};

export const htmlOutput: SimpleMarkdown.Output<string> = SimpleMarkdown.outputFor(rules, 'html');

export const converter = (text: string, options?: Options) => {
	return htmlOutput(parser(text, { options }));
};
