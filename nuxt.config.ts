// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import Aura from '@primevue/themes/aura';
import { stylePreset } from './service/Preset';

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
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.png' }],
		},
	},
	css: ['@/app/assets/styles/main.css'],
	routeRules: {
		'/cabinet/**': { middleware: 'auth' },
	},
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
				preset: stylePreset,
				options: {
					darkModeSelector: false,
				},
			},
		},
	},
});
