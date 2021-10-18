const getters = {
  size: state => state.app.size,
  device: state => state.app.device,
  visibility_category: state => state.filter.visibility_category,
  visibility_sort: state => state.filter.visibility_sort,
  u_id: state => state.user.uID,
  u_name: state => state.user.uName,
  u_balance: state => state.user.uBalance
}
export default getters
