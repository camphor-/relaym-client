import NuxtConfiguration from '@nuxt/config'
const pkg = require('./package')

const nuxtConfig: NuxtConfiguration = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Here Songs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: 'icons/apple-touch-icon.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        href: 'icons/apple-touch-icon-57x57.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        href: 'icons/apple-touch-icon-60x60.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: 'icons/apple-touch-icon-72x72.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        href: 'icons/apple-touch-icon-76x76.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: 'icons/apple-touch-icon-114x114.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: 'icons/apple-touch-icon-120x120.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: 'icons/apple-touch-icon-144x144.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: 'icons/apple-touch-icon-152x152.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: 'icons/apple-touch-icon-180x180.png'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa'
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        if (!config.module) return
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  styleResources: {
    scss: ['~/assets/scss/variables.scss', '~/assets/scss/mixins.scss']
  },

  vuetify: {
    // Vuetify の設定はここに書く
    theme: {
      primary: '#0D47A1',
      secondary: '#b0bec5',
      accent: '#DA4167',
      error: '#b71c1c'
    }
  },

  manifest: {
    name: 'Here Songs',
    short_name: 'Here Songs',
    description: '',
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/icons/android-chrome-36x36.png',
        sizes: '36x36',
        type: 'image/png'
      },
      {
        src: '/icons/android-chrome-48x48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: '/icons/android-chrome-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: '/icons/android-chrome-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: '/icons/android-chrome-128x128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: '/icons/android-chrome-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: '/icons/android-chrome-152x152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/android-chrome-256x256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: '/icons/android-chrome-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },

  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
    BASE_WEBSOCKET_URL:
      process.env.BASE_WEBSOCKET_URL || 'ws://localhost:8080/api/v1'
  }
}

export default nuxtConfig
