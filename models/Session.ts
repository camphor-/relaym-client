/* eslint-disable camelcase */

import User from './User'
import Device from './Device'
import Track from './Track'
import Queue from './Queue'

interface Session {
  id: string
  name: string
  is_public: boolean
  is_progressing: boolean
}
export default Session

export interface SessionDetail extends Session {
  creator: User
  queue: Queue
}

export interface CurrentSession extends SessionDetail {
  delegate?: User
  playback?: Playback
}

export interface Playback {
  paused: boolean
  device: Device
  track: Track
}
