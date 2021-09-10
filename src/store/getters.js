const getters = {
  size: state => state.app.size,
  device: state => state.app.device,
  visibility_category: state => state.filter.visibility_category,
  visibility_sort: state => state.filter.visibility_sort
}
export default getters
