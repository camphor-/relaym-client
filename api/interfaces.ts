import Track from '@/models/Track'
import Device from '@/models/Device'

export interface GetQueueResponse {
  head: number
  items: Track[]
}

export interface GetAvailableDevicesResponse {
  devices: Device[]
}
