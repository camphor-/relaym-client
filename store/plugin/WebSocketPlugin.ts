import { SocketMessage } from '@/models/SocketMessage'

// TODO: SOCKET_URLの設定
const SOCKET_URL = `${process.env.BASE_WEBSOCKET_URL}/ws`

const WebSocketPlugin = (store: any) => {
  let socket: WebSocket | null = null

  store.subscribe((mutation: { type: string; payload: any }) => {
    if (mutation.type === 'currentSession/setSession') {
      if (mutation.payload) {
        if (socket) socket.close()
        socket = new WebSocket(SOCKET_URL)
        socket.onmessage = (e: MessageEvent) => {
          const message = JSON.parse(e.data) as SocketMessage
          // TODO: 残りケースの実装 cf) https://github.com/camphor-/here-songs-server/blob/master/docs/API.md#get-apiv2ws
          switch (message.type) {
            case 'ADDTRACK':
              store.commit('currentSession/addTrack', message.track)
              break
            case 'NEXTTRACK':
              // TODO: サーバー側から前トラックの情報が送られてくるため使用しない
              break
            case 'PLAY':
              store.commit('currentSession/setPlayback', {
                paused: false,
                head: message.head,
                length: message.length,
                progress: message.progress,
                remaining: message.remaining
              })
              break
            case 'RESUME':
              store.commit('currentSession/setPlayback', {
                paused: false,
                head: message.head,
                length: message.length,
                progress: message.progress,
                remaining: message.remaining
              })
              break
            case 'PAUSE':
              store.commit('currentSession/setPlayback', {
                paused: true,
                head: message.head,
                length: message.length,
                progress: message.progress,
                remaining: message.remaining
              })
              break
            case 'INTERRUPT':
              store.commit('currentSession/addInterruptingTrack', message.track)
              break
            case 'PROGRESS':
              store.commit('currentSession/setPlayback', {
                paused: false,
                head: message.head,
                length: message.length,
                progress: message.progress,
                remaining: message.remaining
              })
              break
            default:
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const _: never = message
          }
        }
      }
    }
  })
}
export default WebSocketPlugin
