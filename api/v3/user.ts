import { instance } from '@/api/v3/index'
import { User } from '@/api/v3/types'
import Device from '@/models/Device'

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
