import Track from '@/models/Track'
import Api from '@/api/main'
import Device from '@/models/Device'

interface State {
  trackList: Track[]
  playingTrackId: number
  playing: boolean
}

export const state = () => ({
  trackList: [],
  playingTrackId: 4,
  playing: false
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
  }
}

export const mutations = {
  setTrackList: (state: State, trackList: Track[]) => {
    state.trackList = trackList
  },
  addTrack: (state: State, newTrack: Track) => {
    state.trackList.push(newTrack)
  },
  setPlayback: (state: State, playing: boolean) => {
    state.playing = playing
  },
  nextTrack: (state: State, newTrackId: number) => {
    state.playingTrackId = newTrackId
  }
}

export const actions = {
  async fetchTrackList({ commit }) {
    const res = await Api.getQueue()
    commit('setTrackList', res.items)
    commit('nextTrack', res.head)
  },
  async addTrack({}, trackURI: string) {
    await Api.addTrack(trackURI)
  },
  async play({ commit, state }, device: Device) {
    // TODO: 一時停止にサーバーが対応次第対応する
    if (state.playing) return
    await Api.play(device.id)
    commit('setPlayback', true)
  },
  nextSong({ commit }, newTrackId: number) {
    commit('nextSong', newTrackId)
  }
}
