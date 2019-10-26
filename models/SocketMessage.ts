import Track from '@/models/Track'

export interface AddTrackMessage {
  type: 'ADDTRACK'
  track: Track
}

export interface NextTrackMessage {
  type: 'NEXTTRACK'
  head: number
}

export interface PlayMessage {
  type: 'PLAY'
}

export interface PauseMessage {
  type: 'PAUSE'
}

export interface ResumeMessage {
  type: 'RESUME'
}

export interface InteruputMessage {
  type: 'INTERRUPT'
  track: Track
}

export interface ProgressMessage {
  type: 'PROGRESS'
  length: number
  progress: number
  remaining: number
}

export type SocketMessage =
  | AddTrackMessage
  | NextTrackMessage
  | PlayMessage
  | PauseMessage
  | ResumeMessage
  | InteruputMessage
  | ProgressMessage
