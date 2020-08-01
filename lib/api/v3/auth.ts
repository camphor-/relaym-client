import { baseURL } from '@/lib/api/v3/index'

export const getLoginUrl = (redirectUrl: string | null) => {
  if (redirectUrl) {
    return `${baseURL}/login?redirect_url=${redirectUrl}`
  }
  return `${baseURL}/login`
}
