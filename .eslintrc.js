module.exports = {
	extends: [
		'react-app',
		'xo',
		'xo-typescript',
		'plugin:unicorn/recommended'
	],
	rules: {
		'@typescript-eslint/semi': ['error', 'never'],
		'semi-spacing': ['error', {
			before: false,
			after: true
		}],
		// Too much pointless yelling when doing  if (some.value)
		'@typescript-eslint/strict-boolean-expressions': 0
	}
}