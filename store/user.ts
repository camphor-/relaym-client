import { getMyUserInfo } from '@/api/v3/user'
import { User } from '@/api/v3/types'
import { MessageType } from '@/store/snackbar'

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
  async fetchMyUserInfo({ dispatch, commit }) {
    try {
      const res = await getMyUserInfo()
      commit('setMyUserInfo', res)
    } catch (e) {
      console.error(e)
      dispatch(
        'snackbar/showSnackbar',
        {
          message: 'エラーが 発生しました。時間をおいて再度お試しください。',
          messageType: MessageType.error
        },
        { root: true }
      )
      commit('setMyUserInfo', null)
    }
  }
}
