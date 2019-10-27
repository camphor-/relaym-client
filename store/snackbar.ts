import SnackbarPayload from '../models/SnackbarPayload'
import MessageType from '@/models/MessageType'

interface State {
  isOpen: boolean
  message: string
  messageType: MessageType
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
  showSnackbar({ commit }, payload: SnackbarPayload) {
    commit('setMessage', payload.message)
    commit('setMessageType', payload.messageType)
    commit('open')
  },
  closeSnackbar({ commit }) {
    commit('close')
  }
}
