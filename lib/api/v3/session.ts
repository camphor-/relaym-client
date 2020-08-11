import { Device, Session, Track } from '@/lib/api/v3/types'
import { instance } from '@/lib/api/v3/index'

export const createSession = async (req: CreateSessionRequest) => {
  const res = await instance.post<Session>('/sessions', {
    name: req.name,
    allow_to_control_by_others: req.allowToControlByOthers
  })
  return res.data
}

interface CreateSessionRequest {
  name: string
  allowToControlByOthers: boolean
}

export const getSession = async (id: string) => {
  const res = await instance.get<Session>(`/sessions/${id}`)
  return res.data
}

export const setDevice = async (sessionId: string, req: SetDeviceRequest) => {
  await instance.put(`/sessions/${sessionId}/devices`, {
    device_id: req.deviceId
  })
}

interface SetDeviceRequest {
  deviceId: string
}

export const controlState = async (
  sessionId: string,
  req: ControlStateRequest
) => {
  await instance.put(`/sessions/${sessionId}/state`, req)
}

export type PlaybackStates = 'PLAY' | 'PAUSE' | 'STOP' | 'ARCHIVED'
interface ControlStateRequest {
  state: PlaybackStates
}

export const enqueue = async (id: string, req: EnqueueReq) => {
  await instance.post(`/sessions/${id}/queue`, req)
}

interface EnqueueReq {
  uri: string
}

export const search = async (id: string, req: SearchRequest) => {
  const res = await instance.get<SearchForTracksResponse>(
    `sessions/${id}/search`,
    {
      params: req
    }
  )
  return res.data.tracks
}

interface SearchRequest {
  q: string
}

interface SearchForTracksResponse {
  tracks: Track[]
}

export const getDevices = async (sessionId: string) => {
  const res = await instance.get<GetDevicesResponse>(
    `/sessions/${sessionId}/devices`
  )
  return res.data.devices
}

export interface GetDevicesResponse {
  devices: Device[]
}

export const skipTrack = async (id: string) => {
  await instance.put(`/sessions/${id}/next`)
}
