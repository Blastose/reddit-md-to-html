import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Copy of SimepleMarkdown.parseRef function since the function is not exported
const parseRef = function (
	capture: SimpleMarkdown.Capture,
	state: SimpleMarkdown.State,
	refNode: SimpleMarkdown.RefNode & { original: SimpleMarkdown.SingleASTNode[]; found: boolean }
): SimpleMarkdown.RefNode {
	const ref = (capture[2] || capture[1]).replace(/\s+/g, ' ').toLowerCase();

	if (state._defs && state._defs[ref]) {
		const def = state._defs[ref];
		refNode.target = def.target;
		refNode.title = def.title;
	}

	state._refs = state._refs || {};
	state._refs[ref] = state._refs[ref] || [];
	state._refs[ref].push(refNode);

	return refNode;
};

// Modifies original reflink rule to not match when a link is the second bracket
// like [] []()
// Also modifies the reflink rule to output the original text when a [def]: is not found for the reflink
export const reflink: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.reflink, {
	match: function (source, state, prevCapture) {
		if (state.isReflink) {
			return null;
		}
		return SimpleMarkdown.inlineRegex(
			/^\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\s*\[([^\]]*)\](?!\()/
		)(source, state, prevCapture);
	} satisfies SimpleMarkdown.MatchFunction,
	parse: function (capture, parse, state) {
		state.isReflink = true;
		const parsedRef = parseRef(capture, state, {
			type: 'reflink',
			content: parse(capture[1], state),
			original: parse(capture[0], state),
			found: false
		});
		state.isReflink = false;
		return parsedRef;
	} satisfies SimpleMarkdown.ParseFunction,
	html: function (node, output, state) {
		if (!node.found) {
			return output(node.original, state);
		}

		const attributes = {
			href: SimpleMarkdown.sanitizeUrl(node.target)
				?.replace(/\\/g, '')
				.replace(/^www\./, 'https://www.'),
			title: node.title,
			rel: 'noopener nofollow ugc',
			target: node.addTargetBlank ? '_blank' : null
		};

		return SimpleMarkdown.htmlTag('a', output(node.content, state), attributes);
	} satisfies SimpleMarkdown.HtmlNodeOutput
});
