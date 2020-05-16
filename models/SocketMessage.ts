import Track from '@/models/Track'

export interface BaseMessage {
  head: number
  length: number
  progress: number
  remaining: number
  track: Track
}

export interface AddTrackMessage extends BaseMessage {
  type: 'ADDTRACK'
}

export interface NextTrackMessage extends BaseMessage {
  type: 'NEXTTRACK'
}

export interface PlayMessage extends BaseMessage {
  type: 'PLAY'
}

export interface PauseMessage {
  type: 'PAUSE'
  head: number
  length: number
  progress: number
  remaining: number
}

export interface ResumeMessage extends BaseMessage {
  type: 'RESUME'
  head: number
  length: number
  progress: number
  remaining: number
}

export interface InteruputMessage extends BaseMessage {
  type: 'INTERRUPT'
}

export interface ProgressMessage extends BaseMessage {
  type: 'PROGRESS'
}

export type SocketMessage =
  | AddTrackMessage
  | NextTrackMessage
  | PlayMessage
  | PauseMessage
  | ResumeMessage
  | InteruputMessage
  | ProgressMessage
