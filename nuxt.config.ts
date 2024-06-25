// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head: {
      htmlAttrs: {
        lang: 'ja'
      },
      title: 'オーラス計算 - MajoCalc'
    }
  },
  css: [
    "vuetify/styles",
    '@mdi/font/css/materialdesignicons.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  plugins: [
    '~/plugins/vuetify.js'
  ],
  devtools: { enabled: true }
})
