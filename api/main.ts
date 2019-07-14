import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
})

export default {
  getQueue: async () => {
    const queue = await instance.get('/queue')
    return queue
  },
  addTrack: async (trackId: string) => {
    const newTrack = await instance.post('/add_track', {
      uri: `spotify:track:${trackId}`
    })
    return newTrack
  }
}
