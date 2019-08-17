/* eslint-disable camelcase */
import Image from './Image'

interface User {
  id: string
  uri: string
  display_name: string
  images: Image[]
  is_premium?: boolean
}

export default User
