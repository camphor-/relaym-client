import { ApiException, ErrorResponse, instance } from '@/api/v2/common'
import Track from '@/models/Track'

const searchForTracks = async (req: SearchForTracksRequest) => {
  const res = await instance.get('/search', {
    withCredentials: true,
    params: req
  })
  if (res.status === 200) {
    return res.data as SearchForTracksResponse
  } else {
    const errBody = res.data as ErrorResponse
    throw new ApiException(res.status, errBody.msg)
  }
}

/* eslint-disable camelcase */
export interface SearchForTracksRequest {
  q: string
}
export interface SearchForTracksResponse {
  items: Track[]
}

export default searchForTracks
