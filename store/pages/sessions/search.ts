import { MutationTree, ActionTree } from 'vuex'
import { enqueue, search } from '@/api/v3/session'
import { Track } from '@/api/v3/types'

interface State {
  sessionId: string | null
  result: Track[]
}
export const state = (): State => ({
  sessionId: null,
  result: []
})

export const mutations: MutationTree<State> = {
  setSessionId(state, sessionId: string) {
    state.sessionId = sessionId
  },
  setResult(state, items: Track[]) {
    state.result = items
  }
}

export const actions: ActionTree<State, {}> = {
  setSessionId({ commit }, sessionId: string) {
    commit('setSessionId', sessionId)
  },
  async fetchSearchResult({ state, commit }, q) {
    if (!state.sessionId) return
    commit('setResult', await search(state.sessionId, { q }))
  },
  async enqueueTrack({ state }, uri: string) {
    if (!state.sessionId) return
    await enqueue(state.sessionId, { uri })
  }
}
