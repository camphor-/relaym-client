import { ApiException, ErrorResponse, instance } from '@/api/v2/common'
import Session from '@/models/Session'

const getCurrentSession = async () => {
  const res = await instance.get('/sessions/current', { withCredentials: true })
  if (res.status === 200) {
    return res.data as Session
  } else {
    const errBody = res.data as ErrorResponse
    throw new ApiException(res.status, errBody.msg)
  }
}

export default getCurrentSession
