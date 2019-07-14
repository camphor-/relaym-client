import Artist from '@/models/Artist'
import Album from '@/models/Album'

interface Track {
  album: Album
  artists: Artist[]
  duration_ms: number
  href: string
  id: string
  name: string
  preview_url: string
}
export default Track
