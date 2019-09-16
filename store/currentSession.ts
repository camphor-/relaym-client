import ApiV2 from '../api/v2'
import { CurrentSession } from '@/models/Session'
import Track from '@/models/Track'

interface State {
  session: CurrentSession | null
}
export const state = () => ({
  session: null
})

export const getters = {
  getPlayedTracks(state: State): Track[] {
    if (!state.session) return []
    return state.session.queue.tracks.slice(0, state.session.queue.head)
  },
  getPlayingTrack(state: State): Track | null {
    if (!state.session) return null
    return state.session.queue.tracks[state.session.queue.head!]
  },
  getWaitingTracks(state: State): Track[] {
    if (!state.session) return []
    return state.session.queue.tracks.slice(state.session.queue.head! + 1)
  },
  playable(state: State): boolean {
    if (!state.session) return false
    return state.session.queue.tracks.slice(state.session.queue.head).length > 0
  }
}

export const mutations = {
  setSession: (state: State, newSession: CurrentSession) => {
    state.session = newSession
  },
  addTrack: (state: State, newTrack: Track) => {
    if (!state.session) return
    state.session.queue.tracks.push(newTrack)
  },
  setPaused: (state: State, paused: boolean) => {
    if (!state.session) return
    state.session = {
      ...state.session,
      // TODO: playbackがnullの時の適切な処理
      playback: { ...state.session.playback!, paused }
    }
  },
  nextTrack: (state: State, newTrackId: number) => {
    if (!state.session) return
    state.session = {
      ...state.session,
      queue: { ...state.session.queue, head: newTrackId }
    }
  }
}

export const actions = {
  async addTrack({}, trackURI: string) {
    await ApiV2.sessions.current.addTrack({ uri: trackURI })
  },
  async play({ state, commit }) {
    if (!state.session) return
    if (!state.session.playback || !state.session.playback.paused) return

    try {
      await ApiV2.sessions.current.controlPlayback({ state: 'PLAY' })
      commit('setPaused', false)
    } catch (e) {
      // TODO: Error Handling
      console.error(e)
    }
  },
  async pause({ state, commit }) {
    if (!state.session) return
    if (!state.session.playback || state.session.playback.paused) return

    try {
      await ApiV2.sessions.current.controlPlayback({ state: 'STOP' })
      commit('setPaused', true)
    } catch (e) {
      // TODO: Error Handling
      console.error(e)
    }
  },
  nextSong({ commit }, newTrackId: number) {
    commit('nextSong', newTrackId)
  },
  async getCurrentSession({ commit }) {
    try {
      const newSession = await ApiV2.sessions.current.getCurrentSession()
      commit('setSession', newSession)
    } catch (e) {
      console.error(e)
      commit('setSession', null)
    }
  }
}
