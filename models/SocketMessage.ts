import Track from '@/models/Track'

export interface AddTrackMessage {
  type: 'ADDTRACK'
  track: Track
}

export interface NextTrackMessage {
  type: 'NEXTTRACK'
  head: number
  length: number
  progress: number
  remaining: number
}

export interface PlayMessage {
  type: 'PLAY'
  head: number
  length: number
  progress: number
  remaining: number
}

export interface PauseMessage {
  type: 'PAUSE'
}

export interface ResumeMessage {
  type: 'RESUME'
  head: number
  length: number
  progress: number
  remaining: number
}

export interface InteruputMessage {
  type: 'INTERRUPT'
  head: number
  length: number
  progress: number
  remaining: number
  track: Track
}

export interface ProgressMessage {
  type: 'PROGRESS'
  head: number
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
