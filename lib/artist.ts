import { Artist } from '~/lib/api/v3/types'

export const getArtistNames = (artists: Artist[]) => {
  return artists.map((artist) => artist.name).join(', ')
}
