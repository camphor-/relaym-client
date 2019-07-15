import axios from 'axios'
import { GetAvailableDevicesResponse, GetQueueResponse } from '@/api/interfaces'

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  baseWebSocketURL: process.env.BASE_WEBSOCKET_URL
})

export default {
  getQueue: async () => {
    const res = await instance.get('/queue')
    return res.data as GetQueueResponse
  },
  addTrack: async (trackURI: string) => {
    const res = await instance.post(
      '/add_track',
      {
        uri: trackURI
      },
      { withCredentials: true }
    )
    return res.data
  },
  searchTracks: async (keyword: string) => {
    const res = await instance.get('/search', {
      params: {
        keyword: keyword
      },
      withCredentials: true
    })
    return res.data
  },
  play: async (device: string) => {
    const res = await instance.post(
      '/play',
      {
        device_id: device
      },
      { withCredentials: true }
    )
    return res.data
  },
  getAvailableDevices: async () => {
    const res = await instance.get('/devices', { withCredentials: true })
    return res.data as GetAvailableDevicesResponse
  }
}
