import { MutationTree, ActionTree } from 'vuex'
import Device from '@/models/Device'
import { Session } from '@/api/v3/types'
import { getMyDevices } from '@/api/v3/user'
import { getSession, setDevice } from '@/api/v3/session'

interface State {
  sessionId: string | null
  session: Session | null
  devices: Device[]
}

export const state = (): State => ({
  sessionId: null,
  session: null,
  devices: []
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
  }
}
