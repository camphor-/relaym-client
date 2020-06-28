import { instance } from '@/api/v3/index'
import { User, Device } from '@/api/v3/types'

export const getMyUserInfo = async () => {
  const res = await instance.get<User>('/users/me')
  return res.data
}

export const getMyDevices = async () => {
  const res = await instance.get<GetMyDevicesResponse>('/users/me/devices')
  return res.data.devices
}

export interface GetMyDevicesResponse {
  devices: Device[]
}
