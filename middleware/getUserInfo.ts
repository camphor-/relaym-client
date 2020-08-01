const disabledPathes = ['/terms']
export default (ctx) => {
  if (disabledPathes.includes(ctx.route.path)) {
  }
  ctx.store.dispatch('user/fetchMyUserInfo')
}
