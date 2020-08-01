// ストアモジュールとして認識させないため、ファイル名の頭に - をつけています
// cf) ja.nuxtjs.org/api/configuration-ignore/#ignoreprefix-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3
import { State as userState } from './user'
import { State as snackbarState } from './snackbar'

export interface RootState {
  user: userState
  snackbar: snackbarState
}
