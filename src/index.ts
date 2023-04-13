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
import { specialCharacters } from './rules/specialCharacters.js';
import { link, linkBackwards } from './rules/link.js';
import { autolink } from './rules/autolink.js';
import { url } from './rules/url.js';
import { list } from './rules/list.js';
import { text } from './rules/text.js';
import { hr } from './rules/hr.js';
import { table, nptable } from './rules/table.js';
import { fence } from './rules/fence.js';
import { codeBlock } from './rules/codeBlock.js';
import { image, redditImage } from './rules/image.js';
import { reflink } from './rules/reflink.js';
import SimpleMarkdown from 'simple-markdown';

export interface MediaMetadataImage {
	e: 'Image';
	m: 'image/png' | 'image/jpg';
	s: AlbumEntry;
	t?: string;
	id: string;
}

export interface MediaMetadataGif {
	e: 'AnimatedImage';
	m: 'image/gif';
	ext?: string;
	s: {
		y: number;
		gif: string;
		mp4?: string;
		x: number;
	};
	t?: string;
	id: string;
}

export interface AlbumEntry {
	y: number;
	x: number;
	u: string;
}

export interface Options {
	addTargetBlank?: boolean;
	media_metadata?: {
		[media_id: string]: MediaMetadataImage | MediaMetadataGif | undefined;
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
	lheading,
	blockQuote,
	u,
	link,
	linkBackwards,
	autolink,
	url,
	list,
	text,
	hr,
	table,
	nptable,
	fence,
	codeBlock,
	image,
	redditImage,
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
