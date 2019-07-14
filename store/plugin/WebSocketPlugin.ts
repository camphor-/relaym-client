import { SocketMessage } from '@/models/SocketMessage'

// TODO: SOCKET_URLの設定
const SOCKET_URL = 'ws://localhost:8080/api/v1/ws'

const WebSocketPlugin = (store: any) => {
  const socket = new WebSocket(SOCKET_URL)
  socket.onmessage = (e: MessageEvent) => {
    console.log(e.data)
    const message = JSON.parse(e.data) as SocketMessage
    switch (message.type) {
      case 'ADDTRACK':
        store.commit('tracklist/addTrack', message.track)
        break
      case 'NEXTTRACK':
        store.commit('tracklist/nextTrack', message.head)
        break
      case 'PAUSE':
        store.commit('tracklist/setPlayback', false)
        break
      case 'RESUME':
        store.commit('tracklist/setPlayback', true)
        break
      default:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = message
    }
  }
}
export default WebSocketPlugin
