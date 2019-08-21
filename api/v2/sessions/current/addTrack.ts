import { ApiException, ErrorResponse, instance } from '@/api/v2/common'

const addTrack = async (req: AddTrackRequest) => {
  const res = await instance.post('/sessions/current/tracks/', req, {
    withCredentials: true
  })
  if (res.status !== 204) {
    const errBody = res.data as ErrorResponse
    throw new ApiException(res.status, errBody.msg)
  }
}

export interface AddTrackRequest {
  uri: string
}

export default addTrack
