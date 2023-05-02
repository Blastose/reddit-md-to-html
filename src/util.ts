export function backtrackParentheses(fullMatch: string, capture: string) {
	if (fullMatch.length > 2) {
		if (fullMatch[1] !== '(' || fullMatch[fullMatch.length - 1] !== ')') {
			return null;
		}
	}

	if (fullMatch.length < 4) {
		// ^ ( ) and any character = 4 characters
		return null;
	}

	let count = 2;
	let countLeftParenthesis = 1;

	for (let i = 0; i < capture.length; i++) {
		if (capture[i] === '(') {
			countLeftParenthesis++;
		} else if (capture[i] === ')') {
			countLeftParenthesis--;
		}

		if (countLeftParenthesis === 0) {
			break;
		}
		count++;
	}

	const newCapture = fullMatch.slice(2, count);
	return [fullMatch.slice(0, count + 1), newCapture];
}
