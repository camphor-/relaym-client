import { instance } from '@/api/v3/index'

export const getLoginUrl = () => {
  return instance.getUri({ url: `/login` })
}
