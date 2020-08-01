import { instance } from '@/lib/api/v3/index'
import { User } from '@/lib/api/v3/types'

export const getMyUserInfo = async () => {
  const res = await instance.get<User>('/users/me')
  return res.data
}
