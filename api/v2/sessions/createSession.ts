import { ApiException, ErrorResponse, instance } from '@/api/v2/common'
import Session from '@/models/Session'

const createSession = async (req: CreateSessionRequest) => {
  const res = await instance.post('/sessions/', req, { withCredentials: true })
  if (res.status === 200) {
    return res.data as CreateSessionResponse
  } else {
    const errBody = res.data as ErrorResponse
    throw new ApiException(res.status, errBody.msg)
  }
}

/* eslint-disable camelcase */
export interface CreateSessionRequest {
  is_public: boolean
}
export interface CreateSessionResponse {
  session: Session
}

export default createSession
