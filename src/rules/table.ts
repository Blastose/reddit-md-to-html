import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// From simple-markdown
// We need to extend the TABLES.parseTable function to set state
// isTable to true for other rules (e.g. superscript)
const TABLES = (function () {
	const TABLE_ROW_SEPARATOR_TRIM = /^ *\| *| *\| *$/g;
	const TABLE_CELL_END_TRIM = / *$/;
	const TABLE_RIGHT_ALIGN = /^ *-+: *$/;
	const TABLE_CENTER_ALIGN = /^ *:-+: *$/;
	const TABLE_LEFT_ALIGN = /^ *:-+ *$/;

	const parseTableAlignCapture = function (alignCapture: string): SimpleMarkdown.TableAlignment {
		if (TABLE_RIGHT_ALIGN.test(alignCapture)) {
			return 'right';
		} else if (TABLE_CENTER_ALIGN.test(alignCapture)) {
			return 'center';
		} else if (TABLE_LEFT_ALIGN.test(alignCapture)) {
			return 'left';
		} else {
			return null;
		}
	};

	const parseTableAlign = function (
		source: string,
		_parse: SimpleMarkdown.Parser,
		_state: SimpleMarkdown.State,
		trimEndSeparators: boolean
	): Array<SimpleMarkdown.TableAlignment> {
		if (trimEndSeparators) {
			source = source.replace(TABLE_ROW_SEPARATOR_TRIM, '');
		}
		const alignText = source.trim().split('|');
		return alignText.map(parseTableAlignCapture);
	};

	const parseTableRow = function (
		source: string,
		parse: SimpleMarkdown.Parser,
		state: SimpleMarkdown.State,
		trimEndSeparators: boolean
	): SimpleMarkdown.SingleASTNode[][] {
		const prevInTable = state.inTable;
		state.inTable = true;
		const tableRow = parse(source.trim(), state);
		state.inTable = prevInTable;

		const cells: SimpleMarkdown.SingleASTNode[][] = [[]];
		tableRow.forEach(function (node, i) {
			if (node.type === 'tableSeparator') {
				if (!trimEndSeparators || (i !== 0 && i !== tableRow.length - 1)) {
					cells.push([]);
				}
			} else {
				if (
					node.type === 'text' &&
					(tableRow[i + 1] == null || tableRow[i + 1].type === 'tableSeparator')
				) {
					node.content = node.content.replace(TABLE_CELL_END_TRIM, '');
				}
				cells[cells.length - 1].push(node);
			}
		});

		return cells;
	};

	const parseTableCells = function (
		source: string,
		parse: SimpleMarkdown.Parser,
		state: SimpleMarkdown.State,
		trimEndSeparators: boolean
	): SimpleMarkdown.ASTNode[][] {
		const rowsText = source.trim().split('\n');

		return rowsText.map(function (rowText) {
			return parseTableRow(rowText, parse, state, trimEndSeparators);
		});
	};

	const parseTable = function (trimEndSeparators: boolean): SimpleMarkdown.SingleNodeParseFunction {
		return function (capture, parse, state) {
			state.inline = true;
			state.isTable = true;
			const header = parseTableRow(capture[1], parse, state, trimEndSeparators);
			const align = parseTableAlign(capture[2], parse, state, trimEndSeparators);
			const cells = parseTableCells(capture[3], parse, state, trimEndSeparators);
			state.inline = false;
			state.isTable = false;

			return {
				type: 'table',
				header: header,
				align: align,
				cells: cells
			};
		};
	};

	return {
		parseTable: parseTable(true),
		TABLE_REGEX: /^ *(.+\|.*)\n *\|?( *[-:]+[-| :]*)\n((?: *.*\|.*(?:\n|$))*)\n*/
	};
})();

// Modifies original table rule to match loosely
// The loose match does not require `|` to be at the start of a table row
// Modifies html function to not output more columns than the number of header columns
// Modifies html function to not output empty `tr`'s in `tbody`
export const table: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.table, {
	match: SimpleMarkdown.blockRegex(TABLES.TABLE_REGEX) satisfies SimpleMarkdown.MatchFunction,
	parse: TABLES.parseTable satisfies SimpleMarkdown.ParseFunction,
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
		let tbody = SimpleMarkdown.htmlTag('tbody', '');
		if (!(node.cells.length === 1 && node.cells[0].length === 0)) {
			tbody = SimpleMarkdown.htmlTag('tbody', rows);
		}

		return SimpleMarkdown.htmlTag('table', thead + tbody);
	} satisfies SimpleMarkdownRule['html']
});

// Modifies original nptable rule to not match anything
export const nptable: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.nptable, {
	match: function () {
		return null;
	}
});
