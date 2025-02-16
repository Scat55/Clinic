module.exports = {
	content: [
		'./app.vue',
		'./components/**/*.{vue,js,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
	],
	theme: {
		extend: {
			screens: {
				'xs': '320px', // Добавляем xs перед sm
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
			},
		},
	},
	plugins: [require('tailwindcss-primeui')],
};
