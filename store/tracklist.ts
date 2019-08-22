import ApiV2 from '@/api/v2'
import Track from '@/models/Track'
import Api from '@/api/main'
import Device from '@/models/Device'

interface State {
  trackList: Track[]
  playingTrackId: number
  paused: boolean
  device: Device
}

export const state = () => ({
  trackList: [],
  playingTrackId: 4,
  paused: true,
  device: {}
})

export const getters = {
  getPlayedTracks(state: State): Track[] {
    return state.trackList.slice(0, state.playingTrackId)
  },
  getPlayingTrack(state: State): Track {
    return state.trackList[state.playingTrackId]
  },
  getWaitingTracks(state: State): Track[] {
    return state.trackList.slice(state.playingTrackId + 1)
  },
  playable(state: State): boolean {
    return state.trackList.slice(state.playingTrackId).length > 0
  }
}

export const mutations = {
  setTrackList: (state: State, trackList: Track[]) => {
    state.trackList = trackList
  },
  addTrack: (state: State, newTrack: Track) => {
    state.trackList.push(newTrack)
  },
  setPaused: (state: State, paused: boolean) => {
    state.paused = paused
  },
  nextTrack: (state: State, newTrackId: number) => {
    state.playingTrackId = newTrackId
  },
  setDevice: (state: State, device: Device) => {
    state.device = device
  }
}

export const actions = {
  async fetchTrackList({ commit }) {
    const res = await Api.getQueue()
    commit('setTrackList', res.items)
    commit('nextTrack', res.head)
  },
  async addTrack({}, trackURI: string) {
    await ApiV2.sessions.current.addTrack({ uri: trackURI })
  },
  async play({ state, commit }) {
    if (!state.paused) return
    await ApiV2.sessions.current.controlPlayback({ state: 'PLAY' })
    commit('setPaused', false)
  },
  async pause({ state, commit }) {
    if (state.paused) return
    await ApiV2.sessions.current.controlPlayback({ state: 'PAUSE' })
    commit('setPaused', true)
  },
  // TODO: playとまとめる
  async resume({ state, commit }) {
    if (!state.paused) return
    await ApiV2.sessions.current.controlPlayback({ state: 'PLAY' })
    commit('setPaused', false)
  },
  nextSong({ commit }, newTrackId: number) {
    commit('nextSong', newTrackId)
  },
  async getStatus({ commit }) {
    const res = await Api.getStatus() // TODO: v2への置換え
    commit('setDevice', res.device)
    commit('setPaused', res.paused)
  }
}
