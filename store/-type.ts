import { State as userState } from './user'
import { State as snackbarState } from './snackbar'

export interface RootState {
  user: userState
  snackbar: snackbarState
}
