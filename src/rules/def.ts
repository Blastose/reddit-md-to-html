import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original def rule to also set a `found` flag on the ref node
// This is used to outputting the reflink html:
// If we found the def, we output a link
// else, we simply output the original text instead
export const def: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.def, {
	parse: function (capture, _parse, state) {
		const def = capture[1].replace(/\s+/g, ' ').toLowerCase();
		const target = capture[2];
		const title = capture[3];

		if (state._refs && state._refs[def]) {
			state._refs[def].forEach(function (
				refNode: SimpleMarkdown.RefNode & {
					original: SimpleMarkdown.SingleASTNode[];
					found: boolean;
				}
			) {
				refNode.target = target;
				refNode.title = title;
				refNode.found = true;
			});
		}

		state._defs = state._defs || {};
		state._defs[def] = {
			target: target,
			title: title
		};

		return {
			def: def,
			target: target,
			title: title
		};
	} satisfies SimpleMarkdown.ParseFunction
});
