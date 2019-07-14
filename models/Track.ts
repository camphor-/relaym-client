import Artist from '@/models/Artist'
import Album from '@/models/Album'
import ExternalUrls from '@/models/ExternalUrls'

interface Track {
  album: Album
  artists: Artist[]
  duration_ms: number
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  preview_url: string
}
export default Track
