import { NuxtConfig } from '@nuxt/types'
const pkg = require('./package')

const nuxtConfig: NuxtConfig = {
  ssr: false,
  target: 'static',
  generate: {
    fallback: '200.html'
  },

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate:
      '%s | Relaym - Spotifyの楽曲を1つのスピーカーで楽しめるWebアプリ',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google', content: 'notranslate' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:title', content: 'Relaym' },
      {
        property: 'og:description',
        content: pkg.description
      },
      {
        property: 'og:url',
        content: 'https://relaym.camph.net'
      },
      {
        property: 'og:image',
        content: 'https://relaym.camph.net/ogp.png'
      }
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
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/loadFontAwesome.ts' }],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
    ...(process.env.NODE_ENV === 'development' ? ['@nuxtjs/proxy'] : [])
  ],

  /*
   ** Build configuration
   */
  build: {
    babel: {
      presets() {
        return [['@nuxt/babel-preset-app', { loose: true }]]
      }
    },
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

  buildModules: [
    '@nuxt/typescript-build',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-172508001-1'
      }
    ]
  ],

  styleResources: {
    scss: ['~/assets/scss/variables.scss', '~/assets/scss/mixins.scss']
  },

  vuetify: {
    // Vuetify の設定はここに書く
    theme: {
      primary: '#DC4A5E',
      secondary: '#14213D',
      accent: '#707070',
      error: '#333333'
    },
    treeShake: process.env.NODE_ENV === 'production'
  },

  manifest: {
    name: 'Relaym',
    short_name: 'Relaym',
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
    BASE_URL: process.env.BASE_URL || 'http://relaym.local:3000',
    BASE_WEBSOCKET_URL:
      process.env.BASE_WEBSOCKET_URL || 'ws://relaym.local:3000'
  },

  proxy: {
    // Simple proxy
    '/api': 'http://relaym.local:8080'
  }
}

export default nuxtConfig
