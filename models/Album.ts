import Artist from '@/models/Artist'
import Image from '@/models/Image'

export default interface {
  artists: Artist[]
  href: string
  id: string
  images:Image[]
  name: string
}