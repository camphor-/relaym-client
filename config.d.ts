declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly BASE_URL: string
    readonly BASE_WEBSOCKET_URL: string
  }
}
