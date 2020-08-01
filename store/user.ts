import { ActionTree } from 'vuex'
import { getMyUserInfo } from '@/lib/api/v3/user'
import { User } from '@/lib/api/v3/types'

export interface State {
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

export const actions: ActionTree<State, {}> = {
  async fetchMyUserInfo({ dispatch, commit }) {
    try {
      const res = await getMyUserInfo()
      commit('setMyUserInfo', res)
    } catch (e) {
      // 未認証時に401が返ってくるのは正常なので、エラー表示しない
      if (e.response?.status !== 401) {
        console.error(e)
        dispatch('snackbar/showServerErrorSnackbar', null, { root: true })
      }
      commit('setMyUserInfo', null)
    }
  }
}
