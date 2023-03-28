import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original table rule to match loosely
// The loose match does not require `|` to be at the start of a table row
// Modifies html function to not output more columns than the number of header columns
export const table: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.table, {
	match: SimpleMarkdown.blockRegex(
		/^ *(.+\|.*)\n *\|( *[-:]+[-| :]*)\n((?: *.*\|.*(?:\n|$))*)\n*/
	) satisfies SimpleMarkdown.MatchFunction,
	html: function (node, output, state) {
		const getStyle = function (colIndex: number): string {
			return node.align[colIndex] == null ? '' : 'text-align:' + node.align[colIndex] + ';';
		};

		const numColsInHeader = node.header.length;

		const headers = node.header
			.map(function (content: SimpleMarkdown.ASTNode, i: number) {
				return SimpleMarkdown.htmlTag('th', output(content, state), {
					style: getStyle(i),
					scope: 'col'
				});
			})
			.join('');

		const rows = node.cells
			.map(function (row: SimpleMarkdown.ASTNode) {
				const rowLimitedCols = row.splice(0, numColsInHeader);
				const cols = rowLimitedCols
					.map(function (content: SimpleMarkdown.ASTNode, c: number) {
						return SimpleMarkdown.htmlTag('td', output(content, state), { style: getStyle(c) });
					})
					.join('');

				return SimpleMarkdown.htmlTag('tr', cols);
			})
			.join('');

		const thead = SimpleMarkdown.htmlTag('thead', SimpleMarkdown.htmlTag('tr', headers));
		const tbody = SimpleMarkdown.htmlTag('tbody', rows);

		return SimpleMarkdown.htmlTag('table', thead + tbody);
	} satisfies SimpleMarkdownRule['html']
});
