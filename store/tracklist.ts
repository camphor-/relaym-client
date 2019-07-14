import Track from '@/models/Track'
import Api from '@/api/main'

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
  nextSong: (state: State, newTrackId: number) => {
    state.playingTrackId = newTrackId
  }
}

export const actions = {
  async fetchTrackList({ commit }) {
    const trackList: Track[] = await Api.getQueue()
    commit('setTrackList', trackList)
  },
  async addTrack({ commit }, trackURI: string) {
    const newTrack = await Api.addTrack(trackURI)
    commit('addTrack', newTrack)
  },
  togglePlayback({ commit, state }) {
    commit('setPlayback', !state.playing)
  },
  nextSong({ commit }, newTrackId: number) {
    commit('nextSong', newTrackId)
  }
}
