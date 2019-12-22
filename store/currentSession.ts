import ApiV2 from '../api/v2'
import User from '../models/User'
import Device from '../models/Device'
import { CurrentSession } from '@/models/Session'
import Track from '@/models/Track'

export interface Playback {
  paused: boolean
  finished: boolean
  head: number
  length: number
  progress: number
  remaining: number
}

interface State {
  id: string | null
  name: string
  isPublic: boolean
  isProgressing: boolean
  creator: User | null
  tracks: Track[]
  delegate?: User | null
  device: Device | null
  playback: Playback
}

export const state = () => ({
  id: null,
  name: '',
  isPublic: false,
  isProgressing: false,
  creator: null,
  tracks: [],
  delegate: null,
  device: null,
  playback: {
    paused: true,
    track: null,
    head: -1,
    length: 0,
    progress: 0,
    remaining: 0
  }
})

export const mutations = {
  clearSession: (state: State) => {
    state.id = null
    state.name = ''
    state.isPublic = false
    state.isProgressing = false
    state.creator = null
    state.tracks = []
    state.delegate = null
    state.device = null
  },
  setSession: (state: State, session: CurrentSession) => {
    state.id = session.id
    state.name = session.name
    state.isPublic = session.is_public
    state.isProgressing = session.is_progressing
    state.creator = session.creator
    state.tracks = session.queue.tracks
    state.delegate = session.delegate
    state.device = session.playback ? session.playback.device : null

    state.playback = {
      paused: session.playback ? session.playback.paused : true,
      finished:
        !session.playback && session.queue.head === session.queue.tracks.length,
      head: session.queue.head!,
      length: state.playback.length,
      progress: state.playback.progress,
      remaining: state.playback.remaining
    }
  },
  addTrack: (state: State, newTrack: Track) => {
    if (!state.id) return
    state.tracks.push(newTrack)
  },
  addInterruptingTrack: (state: State, track: Track) => {
    if (!state.id) return
    state.tracks.splice(state.playback.head, 0, track)
  },
  setPaused: (state: State, paused: boolean) => {
    if (!state.id) return
    state.playback = { ...state.playback!, paused }
  },
  setPlayback: (state: State, playback: Playback) => {
    if (!state.id) return
    // 引数をそのまま突っ込むと、INTERUPTで入ってきたtrackがnullになってしまう
    state.playback = playback
  }
}

export const actions = {
  async addTrack({}, trackURI: string) {
    await ApiV2.sessions.current.addTrack({ uri: trackURI })
  },
  async play({ state, commit }) {
    if (!state.id) return
    if (!state.playback.paused) return

    try {
      await ApiV2.sessions.current.controlPlayback({ state: 'PLAY' })
    } catch (e) {
      // TODO: Error Handling
      console.error(e)
    }
  },
  async pause({ state, commit }) {
    if (!state.id) return
    if (state.playback.paused) return

    try {
      await ApiV2.sessions.current.controlPlayback({ state: 'PAUSE' })
    } catch (e) {
      // TODO: Error Handling
      console.error(e)
    }
  },
  async setDevice({ state, dispatch }, deviceId: string) {
    if (!state.id) return
    try {
      await ApiV2.sessions.current.setDevice({ device_id: deviceId })
      dispatch('fetchCurrentSession')
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
      commit('clearSession')
    }
  }
}
