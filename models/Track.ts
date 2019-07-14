import Artist from '@/models/Artist'
import Album from '@/models/Album'
import ExternalUrl from '@/models/ExternalUrls'

interface Track {
  album: Album
  artists: Artist[]
  duration_ms: number
  external_urls: ExternalUrl
  href: string
  id: string
  name: string
  preview_url: string
}
export default Track
