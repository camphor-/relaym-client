import createSession from './sessions/createSession'
import getSession from './sessions/getSession'
import getSessions from './sessions/getSessions'
import joinSession from './sessions/joinSession'
import leaveSession from './sessions/leaveSession'
import addTrack from './sessions/current/addTrack'
import controlPlayback from './sessions/current/controlPlayback'
import getCurrentSession from './sessions/current/getCurrentSession'
import setDevice from './sessions/current/setDevice'
import getMyDevices from './users/me/getMyDevices'
import getMyUserInfo from './users/me/getMyUserInfo'
import { getLoginUrl } from './auth'
import searchForTracks from './searchForTracks'

const ApiV2 = {
  sessions: {
    createSession,
    getSession,
    getSessions,
    joinSession,
    leaveSession,
    current: {
      addTrack,
      controlPlayback,
      getCurrentSession,
      setDevice
    }
  },

  users: {
    me: {
      getMyDevices,
      getMyUserInfo
    }
  },

  searchForTracks,
  getLoginUrl
}
export default ApiV2
