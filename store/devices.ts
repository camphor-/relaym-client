import Device from '@/models/Device'
import Api from '@/api/main'

interface State {
  availableDevices: Device[]
}

export const state = (): State => ({
  availableDevices: []
})

export const getters = {
  getPlayableDevices(state: State): Device[] {
    return state.availableDevices.filter(d => !d.is_restricted)
  }
}

export const mutations = {
  setAvailableDevices: (state: State, devices: Device[]) => {
    state.availableDevices = devices
  }
}

export const actions = {
  async fetchAvailableDevices({ commit }) {
    const res = await Api.getAvailableDevices()
    commit('setAvailableDevices', res.devices)
  }
}
