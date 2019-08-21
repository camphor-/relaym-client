import { ApiException, instance } from '@/api/v2/common'

const setDevice = async (req: SetDeviceRequest) => {
  const res = await instance.put('/sessions/current/device', req, {
    withCredentials: true
  })
  if (res.status !== 204) {
    throw new ApiException(res.status, null)
  }
}

/* eslint-disable camelcase */
export interface SetDeviceRequest {
  device_id: string
}

export default setDevice
