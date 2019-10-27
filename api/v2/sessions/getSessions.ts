import { ApiException, ErrorResponse, instance } from '@/api/v2/common'
import Session from '@/models/Session'

const getSessions = async (): Promise<GetSessionsResponse> => {
  const res = await instance.get('/sessions/', { withCredentials: true })
  if (res.status === 200) {
    return res.data as GetSessionsResponse
  } else {
    const errBody = res.data as ErrorResponse
    throw new ApiException(res.status, errBody.msg)
  }
}

export interface GetSessionsResponse {
  sessions: Session[]
}

export default getSessions
