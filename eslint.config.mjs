// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here

)
    .override('nuxt/typescript', {
        rules: {
            '@typescript-eslint/ban-types': 'off',
            'indent': ['error', 2], // Правило для отступов (2 пробела)
            'vue/html-indent': ['error', 2], // Для Vue-шаблонов (2 пробела)
        }
    })
