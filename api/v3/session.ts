import { Session } from '@/api/v3/types'
import { instance } from '@/api/v3/index'
import Track from '@/models/Track'

export const createSession = async (req: CreateSessionRequest) => {
  const res = await instance.post<Session>('/sessions', req)
  return res.data
}

interface CreateSessionRequest {
  name: string
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

export const controlPlayback = async (
  sessionId: string,
  req: ControlPlaybackRequest
) => {
  await instance.put(`/sessions/${sessionId}/playback`, req)
}

interface ControlPlaybackRequest {
  state: 'PLAY' | 'PAUSE'
}

export const enqueue = async (id: string, req: EnqueueReq) => {
  await instance.post(`/sessions/${id}/queues`, req)
}

interface EnqueueReq {
  uri: string
}

export const search = async (id: string, req: SearchRequest) => {
  const res = await instance.get<SearchForTracksResponse>(
    `sessiond/${id}/search`,
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
