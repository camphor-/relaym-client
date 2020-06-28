import { MutationTree, ActionTree } from 'vuex'
import Device from '@/models/Device'
import { Session, SocketMessage } from '@/api/v3/types'
import { getMyDevices } from '@/api/v3/user'
import { controlPlayback, getSession, setDevice } from '@/api/v3/session'
import { createWebSocket } from '@/api/v3/websocket'

interface State {
  sessionId: string | null
  session: Session | null
  devices: Device[]
  webSocket: WebSocket | null
}

export const state = (): State => ({
  sessionId: null,
  session: null,
  devices: [],
  webSocket: null
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
  }
}

export const actions: ActionTree<State, {}> = {
  setSessionId({ commit, dispatch }, id: string) {
    commit('setSessionId', id)
    dispatch('fetchSession')
  },
  async fetchSession({ state, commit }) {
    if (!state.sessionId) return
    const session = await getSession(state.sessionId)
    commit('setSession', session)
  },
  async fetchAvailableDevices({ commit }) {
    const res = await getMyDevices()
    commit('setAvailableDevices', res)
  },
  async setDevice({ state, commit, dispatch }, deviceId: string) {
    if (!state.session) return
    await setDevice(state.session.id, { deviceId })
    dispatch('fetchSession')
  },
  connectWebSocket({ state, commit, dispatch }) {
    if (!state.sessionId) return
    if (state.webSocket) dispatch('disconnectWebSocket')

    const socket = createWebSocket(state.sessionId)
    socket.onmessage = (ev) => dispatch('handleWebSocketMessage', ev.data)
    socket.onclose = () => commit('setWebSocket', null)
    commit('setWebSocket', socket)
  },
  disconnectWebSocket({ state }) {
    if (!state.webSocket) return
    state.webSocket.close()
  },
  handleWebSocketMessage: ({ dispatch }, message: SocketMessage) => {
    console.log(message)
    dispatch('fetchSession')
  },
  controlPlayback: ({ state }, req: { state: 'PLAY' | 'PAUSE' }) => {
    if (!state.sessionId) return
    controlPlayback(state.sessionId, req)
  }
}
