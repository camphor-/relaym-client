import ApiV2 from '@/api/v2'

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
    commit('setResult', await ApiV2.searchForTracks({ q }))
  }
}
