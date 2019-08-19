import { ApiException, ErrorResponse, instance } from '@/api/v2/common'
import User from '@/models/User'

const getMyUserInfo = async () => {
  const res = await instance.get('/users/me', { withCredentials: true })
  if (res.status === 200) {
    return res.data as User
  } else {
    const errBody = res.data as ErrorResponse
    throw new ApiException(res.status, errBody.msg)
  }
}

export default getMyUserInfo
