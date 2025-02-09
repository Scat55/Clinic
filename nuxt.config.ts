// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import {fileURLToPath} from "node:url";
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Доверие',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/Logo.ico' }]
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@primevue/nuxt-module',
  ],
  css: ['@/app/assets/styles/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./', import.meta.url)),
      }
    }
  },
  eslint: {
    config: {
      stylistic: {
        indent: 'tab',
        semi: true,
        // ...
      }
    }
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        }
      }
    }
  }
})
