import Api from '@/api/main'

export const state = () => ({
  result: []
})

export const mutations = {
  setResult(state, items) {
    state.result = items
  }
}

export const actions = {
  async fetchSearchResult({ commit }, q) {
    commit('setResult', await Api.searchTracks(q))
  }
}
