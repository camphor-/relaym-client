import Track from '@/models/Track'

export interface AddTrackMessage {
  type: 'ADDTRACK'
  track: Track
}

export interface NextTrackMessage {
  type: 'NEXTTRACK'
  head: number
}

export interface PauseMessage {
  type: 'PAUSE'
}

export interface ResumeMessage {
  type: 'RESUME'
}

export type SocketMessage =
  | AddTrackMessage
  | NextTrackMessage
  | PauseMessage
  | ResumeMessage
