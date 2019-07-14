import { SocketMessage } from '@/models/SocketMessage'

// TODO: SOCKET_URLの設定
const SOCKET_URL = 'ws://localhost:8080/api/v1/ws'

const WebSocketPlugin = (store: any) => {
  const socket = new WebSocket(SOCKET_URL)
  socket.onmessage = (e: MessageEvent) => {
    console.log(e.data)
    const message = e.data as SocketMessage
    switch (message.cmd) {
      case 'addTrack':
        store.commit('addTrack', message.track)
        break
      case 'nextTrack':
        store.commit('nextTrack', message.head)
        break
      case 'pause':
        store.commit('setPlayback', false)
        break
      case 'resume':
        store.commit('setPlayback', true)
        break
      default:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = message
    }
  }
}
export default WebSocketPlugin
