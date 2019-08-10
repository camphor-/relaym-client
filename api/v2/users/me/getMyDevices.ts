import { ApiException, ErrorResponse, instance } from '@/api/v2/common'
import Device from '@/models/Device'

const getMyDevices = async () => {
  const res = await instance.get('/users/me/devices', { withCredentials: true })
  if (res.status === 200) {
    return res.data as GetMyDevicesResponse
  } else {
    const errBody = res.data as ErrorResponse
    throw new ApiException(res.status, errBody.msg)
  }
}

export interface GetMyDevicesResponse {
  devices: Device[]
}

export default getMyDevices
