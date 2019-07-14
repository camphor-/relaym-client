import { SocketMessage } from '@/models/SocketMessage'

// TODO: SOCKET_URLの設定
const SOCKET_URL = 'ws://localhost:3000/ws'

const WebSocketPlugin = store => {
  const socket = new WebSocket(SOCKET_URL)
  socket.onmessage = (e: MessageEvent) => {
    console.log(e.data)
    const message = e.data as SocketMessage
    switch (message.cmd) {
      case 'addTrack':
        // store.commit('RECEIVE_DATA', data)
        break
      case 'nextTrack':
        break
      case 'pause':
        break
      case 'resume':
        break
      default:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = message
    }
  }
}
export default WebSocketPlugin
