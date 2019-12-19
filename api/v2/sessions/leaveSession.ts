import { ApiException, instance } from '@/api/v2/common'

const leaveSession = async (id: string) => {
  const res = await instance.delete(`/sessions/${id}/members/`, {
    withCredentials: true
  })
  if (res.status !== 204) {
    throw new ApiException(res.status, res.data.msg)
  }
}

export default leaveSession
