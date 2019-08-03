import { ApiException, ErrorResponse, instance } from '@/api/v2/common'

const controlPlayback = async (req: ControlPlaybackRequest) => {
  const res = await instance.put('/sessions/current/playback', req, {
    withCredentials: true
  })
  if (res.status !== 202) {
    const errBody = res.data as ErrorResponse
    throw new ApiException(res.status, errBody.msg)
  }
}

export interface ControlPlaybackRequest {
  state: 'PLAY' | 'PAUSE' | 'STOP'
}

export default controlPlayback
