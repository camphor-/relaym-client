import Track from '@/models/Track'
import Device from '@/models/Device'
import User from '@/models/User'

export interface GetQueueResponse {
  head: number
  items: Track[]
}

export interface GetAvailableDevicesResponse {
  devices: Device[]
}

export interface GetStatus {
  device: Device
  user: User
  track: Track
  paused: boolean
}
