export const createWebSocket = (sessionId: string) => {
  return new WebSocket(
    `${process.env.BASE_WEBSOCKET_URL}/api/v3/sessions/${sessionId}/ws`
  )
}
