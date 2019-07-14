import Artist from '@/models/Artist'
import Image from '@/models/Image'

interface Album {
  artists: Artist[]
  href: string
  id: string
  images: Image[]
  name: string
}
export default Album
