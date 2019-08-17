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
  creator: User
  delegate?: User
  playback?: {
    paused: boolean
    device: Device
    track: Track
  }
  queue: Queue
}
export default Session
