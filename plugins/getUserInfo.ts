const disabledPathes = ['/terms']
export default (ctx) => {
  if (disabledPathes.includes(ctx.route.path)) {
    return
  }
  return ctx.store.dispatch('user/fetchMyUserInfo')
}
