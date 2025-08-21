/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
	],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			fontFamily: {
				'regular': ['Satoshi-Regular'],
				'medium': ['Satoshi-Medium'],
				'semibold': ['Satoshi-Semibold'],
				'bold': ['Satoshi-Bold'],
			},
		},
	},
	plugins: [],
};


