/* eslint-disable camelcase */

export interface Session {
  id: string
  name: string
  creator: Creator
  playback: Playback
  queue: Queue
}

export interface Creator {
  id: string
  display_name: string
}

export interface Playback {
  state: State
  device: Device | null
}

export type State = StopState | PauseState | PlayState

interface StopState {
  type: 'STOP'
}

interface PauseState {
  type: 'PAUSE'
  length: Number
  progress: Number
  remaining: Number
}

interface PlayState {
  type: 'PLAY'
  length: Number
  progress: Number
  remaining: Number
}

export interface Device {
  id: string
  is_restricted: boolean
  name: string
}

interface Queue {
  head: Number
  tracks: Track[]
}

export interface Track {
  uri: string
  id: string
  name: string
  duration_ms: number
  artists: Artist[]
  external_url: string
  album: Album
}

interface Artist {
  name: string
}

interface Album {
  name: string
  images: Image[]
}

interface Image {
  width: number
  height: number
  url: string
}

export interface User {
  id: string
  uri: string
  display_name: string
  is_premium: boolean
}
