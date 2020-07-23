import { MutationTree, ActionTree } from 'vuex'
import { Session, SocketMessage, Device } from '@/api/v3/types'
import {
  getDevices,
  controlState,
  getSession,
  setDevice
} from '@/api/v3/session'

import { createWebSocket } from '@/api/v3/websocket'
import { MessageType } from '@/store/snackbar'

const DEFAULT_WEBSOCKET_RETRY_INTERVAL = 500

interface State {
  sessionId: string | null
  session: Session | null
  devices: Device[]
  webSocket: WebSocket | null
  webSocketRetryInterval: number
  progressTimer: number | null
  isInterruptDetectedDialogOpen: boolean
}

export const state = (): State => ({
  sessionId: null,
  session: null,
  devices: [],
  webSocket: null,
  webSocketRetryInterval: DEFAULT_WEBSOCKET_RETRY_INTERVAL,
  progressTimer: null,
  isInterruptDetectedDialogOpen: false
})

export const getters = {
  sessionName(state: State): string {
    return state.session?.name ?? ''
  },
  playableDevices(state: State): Device[] {
    return state.devices.filter((d) => !d.is_restricted)
  }
}

export const mutations: MutationTree<State> = {
  setSessionId: (state: State, sessionId: string) => {
    state.sessionId = sessionId
  },
  setSession: (state: State, session: Session) => {
    state.session = session
  },
  setAvailableDevices: (state: State, devices: Device[]) => {
    state.devices = devices
  },
  setWebSocket: (state: State, socket: WebSocket | null) => {
    state.webSocket = socket
  },
  setProgressTimer: (state: State, timer: number) => {
    state.progressTimer = timer
  },
  progressPlayback: (state: State) => {
    if (!state.session || state.session.playback.state.type !== 'PLAY') return

    // 曲の長さより進むことはないようにする
    const newProgress = Math.min(
      state.session.playback.state.progress + 1000,
      state.session.playback.state.length
    )

    state.session = {
      ...state.session,
      playback: {
        ...state.session.playback,
        state: { ...state.session.playback.state, progress: newProgress }
      }
    }
  },
  setIsInterruptDetectedDialogOpen(state: State, isOpen: boolean) {
    state.isInterruptDetectedDialogOpen = isOpen
  },
  setWebSocketRetryInterval(state: State, webSocketRetryInterval: number) {
    state.webSocketRetryInterval = webSocketRetryInterval
  }
}

export const actions: ActionTree<State, {}> = {
  async setSessionId({ commit, dispatch }, id: string) {
    commit('setSessionId', id)
    await dispatch('fetchSession')
  },
  async fetchSession({ state, commit, dispatch }) {
    if (!state.sessionId) return
    try {
      const session = await getSession(state.sessionId)
      commit('setSession', session)
      await dispatch('setProgressTimer')
    } catch (e) {
      if (e.response?.status === 404) {
        throw new Error('このセッションは存在しません。')
      }
      console.error(e)
      dispatch('snackbar/showServerErrorSnackbar', null, { root: true })
    }
  },
  async fetchAvailableDevices({ state, dispatch, commit }) {
    if (!state.sessionId) return
    try {
      const res = await getDevices(state.sessionId)
      commit('setAvailableDevices', res)
    } catch (e) {
      console.error(e)
      dispatch('snackbar/showServerErrorSnackbar', null, { root: true })
    }
  },
  async setDevice({ state, dispatch }, deviceId: string) {
    if (!state.session) return
    try {
      await setDevice(state.session.id, { deviceId })
      await dispatch('fetchSession')
    } catch (e) {
      switch (e.response?.status) {
        case 400:
          dispatch(
            'snackbar/showSnackbar',
            {
              messageType: MessageType.info,
              message: 'デバイスIDが選択されていません。'
            },
            { root: true }
          )
          return
        case 404:
          dispatch(
            'snackbar/showSnackbar',
            {
              messageType: MessageType.info,
              message: 'このセッションは存在しません。'
            },
            { root: true }
          )
          return
      }

      console.error(e)
      dispatch('snackbar/showServerErrorSnackbar', null, { root: true })
    }
  },
  async connectWebSocket({ state, commit, dispatch }) {
    if (!state.sessionId) return
    if (state.webSocket) await dispatch('disconnectWebSocket')

    try {
      const socket = createWebSocket(state.sessionId)
      socket.onopen = () => {
        commit('setWebSocketRetryInterval', DEFAULT_WEBSOCKET_RETRY_INTERVAL)
        dispatch('fetchSession')
      }
      socket.onmessage = (ev) =>
        dispatch('handleWebSocketMessage', JSON.parse(ev.data))
      socket.onclose = () => dispatch('handleWebSocketClose')
      commit('setWebSocket', socket)
    } catch (e) {
      if (e.response?.status === 404) {
        dispatch(
          'snackbar/showSnackbar',
          {
            messageType: MessageType.info,
            message: 'このセッションは存在しません。'
          },
          { root: true }
        )
        return
      }
      console.error(e)
      await dispatch('snackbar/showServerErrorSnackbar', null, { root: true })
      dispatch('reconnectWebSocket')
    }
  },
  disconnectWebSocket({ state, commit }) {
    if (!state.webSocket) return
    commit('setWebSocketRetryInterval', -1)
    state.webSocket.close()
  },
  async reconnectWebSocket({ state, commit, dispatch }) {
    if (state.webSocketRetryInterval < 0) return

    commit('setWebSocketRetryInterval', state.webSocketRetryInterval * 2)

    await new Promise((resolve) =>
      setTimeout(resolve, state.webSocketRetryInterval)
    )
    await dispatch(
      'snackbar/showSnackbar',
      {
        message: '再接続しています…',
        messageType: MessageType.info
      },
      { root: true }
    )
    await dispatch('connectWebSocket')
  },
  handleWebSocketMessage: ({ dispatch, commit }, message: SocketMessage) => {
    console.log(message)
    dispatch('fetchSession')
    switch (message.type) {
      case 'INTERRUPT':
        commit('setIsInterruptDetectedDialogOpen', true)
    }
  },
  handleWebSocketClose: ({ dispatch, commit }) => {
    console.error('WebSocket Disconnected!')
    commit('setWebSocket', null)
    dispatch('reconnectWebSocket')
  },
  controlState: async (
    { state, dispatch },
    req: { state: 'PLAY' | 'PAUSE' }
  ) => {
    if (!state.sessionId) return
    try {
      await controlState(state.sessionId, req)
    } catch (e) {
      switch (e.response?.status) {
        case 400:
          if (e.response.data.message === 'requested state is not allowed') {
            break
          }
          await dispatch(
            'snackbar/showSnackbar',
            {
              messageType: MessageType.info,
              message: '再生する曲がありません。曲を追加してください。'
            },
            { root: true }
          )
          return
        case 403:
          throw e
        case 404:
          await dispatch(
            'snackbar/showSnackbar',
            {
              messageType: MessageType.info,
              message: 'このセッションは存在しません。'
            },
            { root: true }
          )
          return
      }
      console.error(e)
      await dispatch('snackbar/showServerErrorSnackbar', null, { root: true })
    }
  },
  setProgressTimer: async ({ state, commit, dispatch }) => {
    if (state.progressTimer) await dispatch('clearProgressTimer')
    if (!state.session || state.session.playback.state.type !== 'PLAY') return

    const timerId = setInterval(() => commit('progressPlayback'), 1000)
    commit('setProgressTimer', timerId)
  },
  clearProgressTimer: ({ state, commit }) => {
    if (!state.progressTimer) return
    clearInterval(state.progressTimer)
    commit('setProgressTimer', null)
  },
  setIsInterruptDetectedDialogOpen: ({ commit }, isOpen) => {
    commit('setIsInterruptDetectedDialogOpen', isOpen)
  }
}
