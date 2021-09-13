const state = {
  visibility_category: false,
  visibility_sort: false
}

const mutations = {
  TRIGGER_CATEGORY: function (state, value) {
    if (value !== undefined) {
      state.visibility_category = value
    } else {
      state.visibility_category = !state.visibility_category
    }
  },
  TRIGGER_SORT: function (state, value) {
    if (value !== undefined) {
      state.visibility_sort = value
    } else {
      state.visibility_sort = !state.visibility_sort
    }
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
