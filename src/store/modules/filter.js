const state = {
  visibility_category: false,
  visibility_sort: false
}

const mutations = {
  TRIGGER_CATEGORY: function (state) {
    state.visibility_category = !state.visibility_category
  },
  TRIGGER_SORT: function (state) {
    state.visibility_sort = !state.visibility_sort
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
