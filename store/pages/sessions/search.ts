import { MutationTree, ActionTree } from 'vuex'
import { enqueue, search } from '@/lib/api/v3/session'
import { Track } from '@/lib/api/v3/types'
import { MessageType } from '@/store/snackbar'
import { RootState } from '~/store/-type'

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

export const actions: ActionTree<State, RootState> = {
  setSessionId({ commit }, sessionId: string) {
    commit('setSessionId', sessionId)
  },
  async fetchSearchResult({ state, dispatch, commit }, q) {
    if (!state.sessionId) return
    try {
      commit('setResult', await search(state.sessionId, { q }))
    } catch (e) {
      if (e.response?.status === 400) {
        dispatch(
          'snackbar/showSnackbar',
          {
            messageType: MessageType.info,
            message: '検索キーワードが空です。'
          },
          { root: true }
        )
        return
      }
      console.error(e)
      dispatch('snackbar/showServerErrorSnackbar', null, { root: true })
    }
  },
  async enqueueTrack({ state, dispatch }, uri: string) {
    if (!state.sessionId) return
    try {
      await enqueue(state.sessionId, { uri })
    } catch (e) {
      switch (e.response?.status) {
        case 400:
          await dispatch(
            'snackbar/showSnackbar',
            {
              messageType: MessageType.info,
              message: '選択した曲のIDが不正です。'
            },
            { root: true }
          )
          return
        case 404:
          await dispatch(
            'snackbar/showSnackbar',
            {
              messageType: MessageType.info,
              message: 'このセッションは存在しません。'
            },
            { root: true }
          )
          return
      }
      console.error(e)
      dispatch('snackbar/showServerErrorSnackbar', null, { root: true })
    }
  }
}
