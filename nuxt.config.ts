// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
	modules: [
		'@nuxt/eslint',
		'@primevue/nuxt-module',
	],
	plugins: ['~/plugins/primevue.ts'],
	devtools: { enabled: true },
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'Доверие',
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/Logo.ico' }],
		},
	},
	css: ['@/app/assets/styles/main.css'],
	compatibilityDate: '2024-11-01',
	vite: {
		plugins: [
			tailwindcss(),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./', import.meta.url)),
			},
		},
	},
	eslint: {
		config: {
			stylistic: {
				indent: 'tab',
				semi: true,
				// ...
			},
		},
	},
	primevue: {
		options: {
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: false,
				},
			},
		},
	},
});
