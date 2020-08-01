import { Context, Middleware } from '@nuxt/types'

const disabledPathes = ['/terms']
const middleware: Middleware = (ctx: Context) => {
  if (disabledPathes.includes(ctx.route.path)) {
  }
  ctx.store.dispatch('user/fetchMyUserInfo')
}

export default middleware
