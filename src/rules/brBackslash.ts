import SimpleMarkdown, { anyScopeRegex } from 'simple-markdown';
import { SimpleMarkdownRule } from './ruleType';

// Like the original br rule, but also matches backslash and a newline (\\n)
export const brBackslash: SimpleMarkdownRule = {
	order: SimpleMarkdown.defaultRules.br.order,
	match: anyScopeRegex(/^\\\n/),
	parse: () => {
		return {};
	},
	html: function () {
		return '<br>';
	}
};
