import Track from '@/models/Track'

export interface GetQueueResponse {
  head: number
  items: Track[]
}
