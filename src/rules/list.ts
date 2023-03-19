import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// Match function and regex from https://github.com/ariabuckles/simple-markdown/blob/7fb8bb5943ee4e561fec17c2e271a327f4e86d64/src/index.js#L688
// Modifies LIST_R regex to only match list items starting with `1.` and not `[#].`
const LIST_BULLET = '(?:[*+-]|\\d+\\.)';
const LIST_R = new RegExp(
	'^( *)(' +
		'(?:[*+-]|1\\.)' +
		') ' +
		'[\\s\\S]+?(?:\n{2,}(?! )' +
		'(?!\\1' +
		'(?:[*+-]|1\\.)' +
		' )\\n*' +
		'|\\s*\n*$)'
);
const LIST_ITEM_PREFIX = '( *)(' + LIST_BULLET + ') +';
const BLOCK_END_R = /\n{2,}$/;
const LIST_BLOCK_END_R = BLOCK_END_R;
const LIST_LOOKBEHIND_R = /(?:^|\n)( *)$/;
const LIST_ITEM_R = new RegExp(
	LIST_ITEM_PREFIX + '[^\\n]*(?:\\n' + '(?!\\1' + LIST_BULLET + ' )[^\\n]*)*(\n|$)',
	'gm'
);
const LIST_ITEM_END_R = / *\n+$/;
const LIST_ITEM_PREFIX_R = new RegExp('^' + LIST_ITEM_PREFIX);

// Copy of original list rule, but using the modified regex for ol
export const list: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.list, {
	match: function (source, state) {
		const prevCaptureStr = state.prevCapture == null ? '' : state.prevCapture[0];
		const isStartOfLineCapture = LIST_LOOKBEHIND_R.exec(prevCaptureStr);
		const isListBlock = state._list || !state.inline;

		if (isStartOfLineCapture && isListBlock) {
			source = isStartOfLineCapture[1] + source;
			return LIST_R.exec(source);
		} else {
			return null;
		}
	} satisfies SimpleMarkdown.MatchFunction,
	parse: function (capture, parse, state) {
		const bullet = capture[2];
		const ordered = bullet.length > 1;
		const start = ordered ? +bullet : undefined;
		const items = capture[0].replace(LIST_BLOCK_END_R, '\n').match(LIST_ITEM_R) ?? [];

		let lastItemWasAParagraph = false;
		const itemContent = items.map((item, i) => {
			const prefixCapture = LIST_ITEM_PREFIX_R.exec(item);
			const space = prefixCapture ? prefixCapture[0].length : 0;
			const spaceRegex = new RegExp('^ {1,' + space + '}', 'gm');

			const content = item.replace(spaceRegex, '').replace(LIST_ITEM_PREFIX_R, '');

			const isLastItem = i === items.length - 1;
			const containsBlocks = content.indexOf('\n\n') !== -1;

			const thisItemIsAParagraph = containsBlocks || (isLastItem && lastItemWasAParagraph);
			lastItemWasAParagraph = thisItemIsAParagraph;

			const oldStateInline = state.inline;
			const oldStateList = state._list;
			state._list = true;

			let adjustedContent;
			if (thisItemIsAParagraph) {
				state.inline = false;
				adjustedContent = content.replace(LIST_ITEM_END_R, '\n\n');
			} else {
				state.inline = true;
				adjustedContent = content.replace(LIST_ITEM_END_R, '');
			}

			const result = parse(adjustedContent, state);

			state.inline = oldStateInline;
			state._list = oldStateList;
			return result;
		});

		return {
			ordered: ordered,
			start: start,
			items: itemContent
		};
	} satisfies SimpleMarkdown.ParseFunction
});
