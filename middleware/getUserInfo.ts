import { Plugin } from '@nuxt/types'

const disabledPathes = ['/terms']
const plugin: Plugin = (ctx) => {
  if (disabledPathes.includes(ctx.route.path)) {
  }
  ctx.store.dispatch('user/fetchMyUserInfo')
}

export default plugin
