import Track from '@/models/Track'

interface State {
  trackList: Track[]
  playingTrackId: number
  playing: boolean
}

export const state = () => ({
  trackList: [],
  playingTrackId: 4,
  playing: false
})

export const getters = {
  getPlayedTracks(state: State): Track[] {
    return state.trackList.slice(0, state.playingTrackId)
  },
  getPlayingTrack(state: State): Track {
    return state.trackList[state.playingTrackId]
  },
  getWaitingTracks(state: State): Track[] {
    return state.trackList.slice(state.playingTrackId + 1)
  }
}

export const mutations = {
  setTrackList: (state: State, trackList: Track[]) => {
    state.trackList = trackList
  },
  addTrack: (state: State, newTrack: Track) => {
    state.trackList.push(newTrack)
  },
  setPlayback: (state: State, playing: boolean) => {
    state.playing = playing
  },
  nextSong: (state: State, newTrackId: number) => {
    state.playingTrackId = newTrackId
  }
}

export const actions = {
  fetchTrackList({ commit }) {
    const trackList: Track[] = [
      {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
              id: '0bAsR2unSRpn6BQPEnNlZm',
              name: 'Aimer'
            }
          ],
          href: 'https://api.spotify.com/v1/albums/4KiW4nVZ5bUJk2Q8LyXCzs',
          id: '4KiW4nVZ5bUJk2Q8LyXCzs',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/c0f3fdc9512e35ee56189b4a3a9a23c7c212c353',
              width: 640
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/087fe586ca295b1ec8dfa81cd21cff056245458b',
              width: 300
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/994b94c07eb6b5d475482ebfc16342c539bc80cb',
              width: 64
            }
          ],
          name: 'BEST SELECTION "noir"'
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
            id: '0bAsR2unSRpn6BQPEnNlZm',
            name: 'Aimer'
          }
        ],
        duration_ms: 328786,
        external_urls: {
          spotify: 'https://open.spotify.com/track/6PAVYkfGLNidSQRDZOANCI'
        },
        href: 'https://api.spotify.com/v1/tracks/6PAVYkfGLNidSQRDZOANCI',
        id: '6PAVYkfGLNidSQRDZOANCI',
        name: 'StarRingChild',
        preview_url:
          'https://p.scdn.co/mp3-preview/d825a50e933b79a528b8801a82e0ddbc3045bade?cid=774b29d4f13844c495f206cafdad9c86'
      },
      {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
              id: '0bAsR2unSRpn6BQPEnNlZm',
              name: 'Aimer'
            }
          ],
          href: 'https://api.spotify.com/v1/albums/4KiW4nVZ5bUJk2Q8LyXCzs',
          id: '4KiW4nVZ5bUJk2Q8LyXCzs',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/c0f3fdc9512e35ee56189b4a3a9a23c7c212c353',
              width: 640
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/087fe586ca295b1ec8dfa81cd21cff056245458b',
              width: 300
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/994b94c07eb6b5d475482ebfc16342c539bc80cb',
              width: 64
            }
          ],
          name: 'BEST SELECTION "noir"'
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
            id: '0bAsR2unSRpn6BQPEnNlZm',
            name: 'Aimer'
          }
        ],
        duration_ms: 231506,
        external_urls: {
          spotify: 'https://open.spotify.com/track/6PAVYkfGLNidSQRDZOANCI'
        },
        href: 'https://api.spotify.com/v1/tracks/6z80TolVbWQb87u4Se77ec',
        id: '6z80TolVbWQb87u4Se77ec',
        name: 'Brave Shine',
        preview_url:
          'https://p.scdn.co/mp3-preview/cd570c4512c1f134264b9f3709f77858e346e373?cid=774b29d4f13844c495f206cafdad9c86'
      },
      {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
              id: '0bAsR2unSRpn6BQPEnNlZm',
              name: 'Aimer'
            }
          ],
          href: 'https://api.spotify.com/v1/albums/4KiW4nVZ5bUJk2Q8LyXCzs',
          id: '4KiW4nVZ5bUJk2Q8LyXCzs',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/c0f3fdc9512e35ee56189b4a3a9a23c7c212c353',
              width: 640
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/087fe586ca295b1ec8dfa81cd21cff056245458b',
              width: 300
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/994b94c07eb6b5d475482ebfc16342c539bc80cb',
              width: 64
            }
          ],
          name: 'BEST SELECTION "noir"'
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
            id: '0bAsR2unSRpn6BQPEnNlZm',
            name: 'Aimer'
          }
        ],
        duration_ms: 252973,
        external_urls: {
          spotify: 'https://open.spotify.com/track/6PAVYkfGLNidSQRDZOANCI'
        },
        href: 'https://api.spotify.com/v1/tracks/67z29VfVjdmjjNx5hRCXFv',
        id: '67z29VfVjdmjjNx5hRCXFv',
        name: 'insane dream',
        preview_url:
          'https://p.scdn.co/mp3-preview/84b0d87a1ef8b4cce2b40c42d530238bdc1ebdac?cid=774b29d4f13844c495f206cafdad9c86'
      },
      {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
              id: '0bAsR2unSRpn6BQPEnNlZm',
              name: 'Aimer'
            }
          ],
          href: 'https://api.spotify.com/v1/albums/4KiW4nVZ5bUJk2Q8LyXCzs',
          id: '4KiW4nVZ5bUJk2Q8LyXCzs',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/c0f3fdc9512e35ee56189b4a3a9a23c7c212c353',
              width: 640
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/087fe586ca295b1ec8dfa81cd21cff056245458b',
              width: 300
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/994b94c07eb6b5d475482ebfc16342c539bc80cb',
              width: 64
            }
          ],
          name: 'BEST SELECTION "noir"'
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
            id: '0bAsR2unSRpn6BQPEnNlZm',
            name: 'Aimer'
          }
        ],
        duration_ms: 274493,
        external_urls: {
          spotify: 'https://open.spotify.com/track/6PAVYkfGLNidSQRDZOANCI'
        },
        href: 'https://api.spotify.com/v1/tracks/6dlqtdwF2mVWcN9WdtnsTh',
        id: '6dlqtdwF2mVWcN9WdtnsTh',
        name: '眠りの森',
        preview_url:
          'https://p.scdn.co/mp3-preview/232f966dcb88050557ca4e4dc863806c37fd7243?cid=774b29d4f13844c495f206cafdad9c86'
      },
      {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
              id: '0bAsR2unSRpn6BQPEnNlZm',
              name: 'Aimer'
            }
          ],
          href: 'https://api.spotify.com/v1/albums/4KiW4nVZ5bUJk2Q8LyXCzs',
          id: '4KiW4nVZ5bUJk2Q8LyXCzs',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/c0f3fdc9512e35ee56189b4a3a9a23c7c212c353',
              width: 640
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/087fe586ca295b1ec8dfa81cd21cff056245458b',
              width: 300
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/994b94c07eb6b5d475482ebfc16342c539bc80cb',
              width: 64
            }
          ],
          name: 'BEST SELECTION "noir"'
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
            id: '0bAsR2unSRpn6BQPEnNlZm',
            name: 'Aimer'
          }
        ],
        duration_ms: 318480,
        external_urls: {
          spotify: 'https://open.spotify.com/track/6PAVYkfGLNidSQRDZOANCI'
        },
        href: 'https://api.spotify.com/v1/tracks/5uxHqiXHmCv4CGxHiqqSfE',
        id: '5uxHqiXHmCv4CGxHiqqSfE',
        name: 'LAST STARDUST',
        preview_url:
          'https://p.scdn.co/mp3-preview/d8dd219f95dcf2c1570dcd2054ed4b9a8b23f81a?cid=774b29d4f13844c495f206cafdad9c86'
      },
      {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
              id: '0bAsR2unSRpn6BQPEnNlZm',
              name: 'Aimer'
            }
          ],
          href: 'https://api.spotify.com/v1/albums/4KiW4nVZ5bUJk2Q8LyXCzs',
          id: '4KiW4nVZ5bUJk2Q8LyXCzs',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/c0f3fdc9512e35ee56189b4a3a9a23c7c212c353',
              width: 640
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/087fe586ca295b1ec8dfa81cd21cff056245458b',
              width: 300
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/994b94c07eb6b5d475482ebfc16342c539bc80cb',
              width: 64
            }
          ],
          name: 'BEST SELECTION "noir"'
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
            id: '0bAsR2unSRpn6BQPEnNlZm',
            name: 'Aimer'
          }
        ],
        duration_ms: 226360,
        external_urls: {
          spotify: 'https://open.spotify.com/track/6PAVYkfGLNidSQRDZOANCI'
        },
        href: 'https://api.spotify.com/v1/tracks/72U5Pm8g86Mxl73eCtFh62',
        id: '72U5Pm8g86Mxl73eCtFh62',
        name: '凍えそうな季節から -extended ver.-',
        preview_url:
          'https://p.scdn.co/mp3-preview/b57c9ae89293c46f20bdb7d91346daf4a5ec62b9?cid=774b29d4f13844c495f206cafdad9c86'
      },
      {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
              id: '0bAsR2unSRpn6BQPEnNlZm',
              name: 'Aimer'
            }
          ],
          href: 'https://api.spotify.com/v1/albums/4KiW4nVZ5bUJk2Q8LyXCzs',
          id: '4KiW4nVZ5bUJk2Q8LyXCzs',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/c0f3fdc9512e35ee56189b4a3a9a23c7c212c353',
              width: 640
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/087fe586ca295b1ec8dfa81cd21cff056245458b',
              width: 300
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/994b94c07eb6b5d475482ebfc16342c539bc80cb',
              width: 64
            }
          ],
          name: 'BEST SELECTION "noir"'
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
            id: '0bAsR2unSRpn6BQPEnNlZm',
            name: 'Aimer'
          }
        ],
        duration_ms: 294160,
        external_urls: {
          spotify: 'https://open.spotify.com/track/6PAVYkfGLNidSQRDZOANCI'
        },
        href: 'https://api.spotify.com/v1/tracks/6lYJi0WfmdfHbRnl3CsBl0',
        id: '6lYJi0WfmdfHbRnl3CsBl0',
        name: '誰か、海を。',
        preview_url:
          'https://p.scdn.co/mp3-preview/8923a3f84c35a564c068dbfd9a04b58e85b8ac34?cid=774b29d4f13844c495f206cafdad9c86'
      },
      {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
              id: '0bAsR2unSRpn6BQPEnNlZm',
              name: 'Aimer'
            }
          ],
          href: 'https://api.spotify.com/v1/albums/4KiW4nVZ5bUJk2Q8LyXCzs',
          id: '4KiW4nVZ5bUJk2Q8LyXCzs',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/c0f3fdc9512e35ee56189b4a3a9a23c7c212c353',
              width: 640
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/087fe586ca295b1ec8dfa81cd21cff056245458b',
              width: 300
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/994b94c07eb6b5d475482ebfc16342c539bc80cb',
              width: 64
            }
          ],
          name: 'BEST SELECTION "noir"'
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/56DI8ZPmFBVjy5GeanVYwS',
            id: '56DI8ZPmFBVjy5GeanVYwS',
            name: 'Aimer with chelly (EGOIST)'
          }
        ],
        duration_ms: 260773,
        external_urls: {
          spotify: 'https://open.spotify.com/track/6PAVYkfGLNidSQRDZOANCI'
        },
        href: 'https://api.spotify.com/v1/tracks/4BN18XBNMkS1Sol9iaZWJP',
        id: '4BN18XBNMkS1Sol9iaZWJP',
        name: 'ninelie',
        preview_url:
          'https://p.scdn.co/mp3-preview/d78e091bb92ab0d7b01962ed1b9c7c5164b16baf?cid=774b29d4f13844c495f206cafdad9c86'
      },
      {
        album: {
          artists: [
            {
              href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
              id: '0bAsR2unSRpn6BQPEnNlZm',
              name: 'Aimer'
            }
          ],
          href: 'https://api.spotify.com/v1/albums/4KiW4nVZ5bUJk2Q8LyXCzs',
          id: '4KiW4nVZ5bUJk2Q8LyXCzs',
          images: [
            {
              height: 640,
              url:
                'https://i.scdn.co/image/c0f3fdc9512e35ee56189b4a3a9a23c7c212c353',
              width: 640
            },
            {
              height: 300,
              url:
                'https://i.scdn.co/image/087fe586ca295b1ec8dfa81cd21cff056245458b',
              width: 300
            },
            {
              height: 64,
              url:
                'https://i.scdn.co/image/994b94c07eb6b5d475482ebfc16342c539bc80cb',
              width: 64
            }
          ],
          name: 'BEST SELECTION "noir"'
        },
        artists: [
          {
            href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
            id: '0bAsR2unSRpn6BQPEnNlZm',
            name: 'Aimer'
          }
        ],
        duration_ms: 275306,
        external_urls: {
          spotify: 'https://open.spotify.com/track/6PAVYkfGLNidSQRDZOANCI'
        },
        href: 'https://api.spotify.com/v1/tracks/1queJZlgboTAvm5wYc2RTK',
        id: '1queJZlgboTAvm5wYc2RTK',
        name: 'holLow wORlD',
        preview_url:
          'https://p.scdn.co/mp3-preview/2b0662a46dd466f818babe695b9f77f457dee734?cid=774b29d4f13844c495f206cafdad9c86'
      }
    ]
    commit('setTrackList', trackList)
  },
  addTrack({ commit }, trackId: string) {
    const newTrack = getNewTrack(trackId)
    commit('addTrack', newTrack)
  },
  togglePlayback({ commit, state }) {
    commit('setPlayback', !state.playing)
  },
  nextSong({ commit }, newTrackId: number) {
    commit('nextSong', newTrackId)
  }
}

const getNewTrack = (trackId: string): Track => {
  return {
    album: {
      artists: [
        {
          href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
          id: '0bAsR2unSRpn6BQPEnNlZm',
          name: 'Aimer'
        }
      ],
      href: 'https://api.spotify.com/v1/albums/4KiW4nVZ5bUJk2Q8LyXCzs',
      id: '4KiW4nVZ5bUJk2Q8LyXCzs',
      images: [
        {
          height: 640,
          url:
            'https://i.scdn.co/image/c0f3fdc9512e35ee56189b4a3a9a23c7c212c353',
          width: 640
        },
        {
          height: 300,
          url:
            'https://i.scdn.co/image/087fe586ca295b1ec8dfa81cd21cff056245458b',
          width: 300
        },
        {
          height: 64,
          url:
            'https://i.scdn.co/image/994b94c07eb6b5d475482ebfc16342c539bc80cb',
          width: 64
        }
      ],
      name: 'BEST SELECTION "noir"'
    },
    artists: [
      {
        href: 'https://api.spotify.com/v1/artists/0bAsR2unSRpn6BQPEnNlZm',
        id: '0bAsR2unSRpn6BQPEnNlZm',
        name: 'Aimer'
      }
    ],
    duration_ms: 328786,
    external_urls: {
      spotify: 'https://open.spotify.com/track/6PAVYkfGLNidSQRDZOANCI'
    },
    href: 'https://api.spotify.com/v1/tracks/6PAVYkfGLNidSQRDZOANCI',
    id: trackId,
    name: 'StarRingChild',
    preview_url:
      'https://p.scdn.co/mp3-preview/d825a50e933b79a528b8801a82e0ddbc3045bade?cid=774b29d4f13844c495f206cafdad9c86'
  }
}
