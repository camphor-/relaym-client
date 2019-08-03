import { ApiException, instance } from '@/api/v2/common'

const leaveSession = async (id: string) => {
  const res = await instance.post(`/sessions/${id}/members/`, null, {
    withCredentials: true
  })
  if (res.status !== 204) {
    throw new ApiException(res.status, null)
  }
}

export default leaveSession
