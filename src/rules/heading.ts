import SimpleMarkdown, { blockRegex } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// Modifies original heading rule to support a new block on the next line
export const heading: SimpleMarkdownRule = Object.assign({}, SimpleMarkdown.defaultRules.heading, {
	match: blockRegex(/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n *)*\n/)
});
