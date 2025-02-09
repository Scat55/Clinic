// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
	// Your custom configs здесь
)
	.override('nuxt/typescript/rules', { // <-- Исправлено название
		rules: {
			'@typescript-eslint/ban-types': 'off',
			'vue/ no-multiple-template-root': 'off',
			'vue/html-indent': ['error', 2], // Устанавливает отступы в Vue-шаблонах
		},
	});
