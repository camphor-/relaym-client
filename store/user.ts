import { getMyUserInfo } from '@/lib/api/v3/user'
import { User } from '@/lib/api/v3/types'

interface State {
  isLoading: boolean
  me: User | null
}
export const state = (): State => ({
  isLoading: true,
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
  },
  setIsLoading: (state: State, isLoading: boolean) => {
    state.isLoading = isLoading
  }
}

export const actions = {
  async fetchMyUserInfo({ dispatch, commit }) {
    try {
      commit('setIsLoading', true)
      const res = await getMyUserInfo()
      commit('setMyUserInfo', res)
    } catch (e) {
      // 未認証時に401が返ってくるのは正常なので、エラー表示しない
      if (e.response?.status !== 401) {
        console.error(e)
        dispatch('snackbar/showServerErrorSnackbar', null, { root: true })
      }
      commit('setMyUserInfo', null)
    } finally {
      commit('setIsLoading', false)
    }
  }
}
