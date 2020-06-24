import User from '@/models/User'
import { getMyUserInfo } from '@/api/v3/user'

interface State {
  me: User | null
}
export const state = (): State => ({
  me: null
})

export const getters = {
  isLoggedIn(state: State): boolean {
    return !!state.me
  }
}

export const mutations = {
  setMyUserInfo: (state: State, newUser: User) => {
    state.me = newUser
  }
}

export const actions = {
  async fetchMyUserInfo({ commit }) {
    try {
      const res = await getMyUserInfo()
      commit('setMyUserInfo', res)
    } catch (e) {
      console.error(e)
      commit('setMyUserInfo', null)
    }
  }
}
