import ApiV2 from '../api/v2'
import SnackbarPayload from '../models/SnackbarPayload'
import MessageType from '../models/MessageType'
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
    if (!state.session || !state.session.queue.head) return []
    if (!state.session.playback)
      return state.session.queue.tracks.slice(0, state.session.queue.head + 1)

    const playbackUri = state.session.playback.track.uri
    const headUri = state.session.queue.tracks[state.session.queue.head].uri

    const endIndex =
      playbackUri === headUri
        ? state.session.queue.head
        : state.session.queue.head + 1
    return state.session.queue.tracks.slice(0, endIndex)
  },
  getPlayingTrack(state: State): Track | null {
    if (!state.session || !state.session.playback) return null
    return state.session.playback.track
  },
  getWaitingTracks(state: State): Track[] {
    if (!state.session) return []
    if (!state.session.playback && state.session.queue.head === 0)
      return state.session.queue.tracks
    return state.session.queue.tracks.slice(state.session.queue.head! + 1)
  },
  playable(state: State): boolean {
    if (!state.session) return false
    if (!('delegate' in state.session)) return false // TODO: デバイス指定済かのもっと妥当な判定
    if (state.session.queue.tracks.slice(state.session.queue.head).length === 0)
      return false

    return true
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
  async addTrack({ dispatch }, track: Track) {
    try {
      await ApiV2.sessions.current.addTrack({ uri: track.uri })
      dispatch(
        'snackbar/showSnackbar',
        {
          message: `${track.name} を追加しました`,
          messageType: MessageType.info
        } as SnackbarPayload,
        { root: true }
      )
    } catch (err) {
      console.error(err)
      dispatch(
        'snackbar/showSnackbar',
        {
          message: '曲を追加できませんでした',
          messageType: MessageType.error
        } as SnackbarPayload,
        { root: true }
      )
    }
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
  async setDevice({ state }, deviceId: string) {
    if (!state.session) return
    try {
      await ApiV2.sessions.current.setDevice({ device_id: deviceId })
    } catch (e) {
      // TODO: Error Handling
      console.error(e)
    }
  },
  async fetchCurrentSession({ commit }) {
    try {
      const newSession = await ApiV2.sessions.current.getCurrentSession()
      commit('setSession', newSession)
    } catch (e) {
      console.error(e)
      commit('setSession', null)
    }
  }
}
