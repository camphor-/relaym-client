interface State {
  isOpen: boolean
  message: string
  messageType: MessageType
}

export interface SnackbarPayload {
  message: string
  messageType: MessageType
}

export enum MessageType {
  info,
  error
}

export const state = (): State => ({
  isOpen: false,
  message: '',
  messageType: MessageType.info
})

export const mutations = {
  open(state: State) {
    state.isOpen = true
  },
  close(state: State) {
    state.isOpen = false
  },
  setMessage(state: State, message: string) {
    state.message = message
  },
  setMessageType(state: State, messageType: MessageType) {
    state.messageType = messageType
  }
}

export const actions = {
  showSnackbar({ commit, state }, payload: SnackbarPayload) {
    commit('setMessage', payload.message)
    commit('setMessageType', payload.messageType)

    // すでに開いている場合は一回とじる
    if (state.isOpen) {
      commit('close')
      setTimeout(() => {
        commit('open')
      }, 200)
      return
    }
    commit('open')
  },
  showServerErrorSnackbar({ dispatch }) {
    dispatch('showSnackbar', {
      message: 'エラーが 発生しました。時間をおいて再度お試しください。',
      messageType: MessageType.error
    })
  },
  closeSnackbar({ commit }) {
    commit('close')
  },

  setIsOpen({ commit }, isOpen: boolean) {
    if (isOpen) {
      commit('open')
    } else {
      commit('close')
    }
  }
}
