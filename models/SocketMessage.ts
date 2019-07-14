import Track from '@/models/Track'

export interface AddTrackMessage {
  cmd: 'addTrack'
  track: Track
}

export interface NextTrackMessage {
  cmd: 'nextTrack'
  head: number
}

export interface PauseMessage {
  cmd: 'pause'
}

export interface ResumeMessage {
  cmd: 'resume'
}

export type SocketMessage =
  | AddTrackMessage
  | NextTrackMessage
  | PauseMessage
  | ResumeMessage
