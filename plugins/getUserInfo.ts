export default ctx => {
  return ctx.store.dispatch('user/fetchMyUserInfo')
}
