import { ApiException, ErrorResponse, instance } from '@/api/v2/common'
import { SessionDetail } from '@/models/Session'

const getSession = async (id: string) => {
  const res = await instance.get(`/sessions/${id}`, { withCredentials: true })
  if (res.status === 200) {
    return res.data as GetSessionResponse
  } else {
    const errBody = res.data as ErrorResponse
    throw new ApiException(res.status, errBody.msg)
  }
}

export interface GetSessionResponse {
  session: SessionDetail
}

export default getSession
