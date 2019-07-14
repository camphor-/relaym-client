import axios from 'axios'
import Track from '@/models/Track'

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
})

export default {
  getQueue: async () => {
    const res = await instance.get('/queue')
    return res.data as Track[]
  },
  addTrack: async (trackURI: string) => {
    const res = await instance.post('/add_track', {
      uri: trackURI
    })
    return res.data
  }
}
