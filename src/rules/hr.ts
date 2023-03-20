import SimpleMarkdown from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType.js';

// Modifies original hr rule to support a new block on the next line
export const hr: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.hr, {
	match: SimpleMarkdown.blockRegex(/^( *[-*_]){3,} *(?:\n *)+/)
});
