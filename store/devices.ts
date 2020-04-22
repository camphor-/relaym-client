import Device from '@/models/Device'
import ApiV2 from '@/api/v2'

interface State {
  availableDevices: Device[]
}

export const state = (): State => ({
  availableDevices: []
})

export const getters = {
  getPlayableDevices(state: State): Device[] {
    return state.availableDevices.filter((d) => !d.is_restricted)
  }
}

export const mutations = {
  setAvailableDevices: (state: State, devices: Device[]) => {
    state.availableDevices = devices
  }
}

export const actions = {
  async fetchAvailableDevices({ commit }) {
    const res = await ApiV2.users.me.getMyDevices()
    commit('setAvailableDevices', res.devices)
  }
}
