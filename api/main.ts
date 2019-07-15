import axios from 'axios'
import Track from '@/models/Track'
import { GetQueueResponse } from '@/api/interfaces'

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
})

export default {
  getQueue: async () => {
    const res = await instance.get('/queue')
    return res.data as GetQueueResponse
  },
  addTrack: async (trackURI: string) => {
    const res = await instance.post('/add_track', {
      uri: trackURI
    })
    return res.data
  }
}
