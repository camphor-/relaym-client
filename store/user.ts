import { ActionTree } from 'vuex'
import { getMyUserInfo } from '@/lib/api/v3/user'
import { User } from '@/lib/api/v3/types'

export type LoadingState = 'loading' | 'loaded' | 'error'

export interface State {
  loadingState: LoadingState
  me: User | null
}
export const state = (): State => ({
  loadingState: 'loading',
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
  setLoadingState: (state: State, loadingState: LoadingState) => {
    state.loadingState = loadingState
  }
}

export const actions: ActionTree<State, {}> = {
  async fetchMyUserInfo({ dispatch, commit }) {
    try {
      commit('setLoadingState', 'loading')
      const res = await getMyUserInfo()
      commit('setMyUserInfo', res)
      commit('setLoadingState', 'loaded')
    } catch (e) {
      commit('setMyUserInfo', null)

      // 未認証時に401が返ってくるのは正常なので、エラー表示しない
      if (e.response?.status === 401) {
        commit('setLoadingState', 'loaded')
        return
      }

      // 401以外のエラーは例外処理
      console.error(e)
      dispatch('snackbar/showServerErrorSnackbar', null, { root: true })
      commit('setLoadingState', 'error')
    }
  }
}
