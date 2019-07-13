import Artist from '@/models/Artist'
import Album from '@/models/Album'

export default interface {
  album: Album
  artists: Artist[]
  duration_ms: number
  href: string
  id: string
  name: string
  preview_url: string
}