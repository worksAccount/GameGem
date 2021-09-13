const state = {
  uID: '',
  uName: ''
}

const mutations = {
  SET_UID: function (state, value) {
    state.uID = value
    window.sessionStorage.setItem('GameGemUID', value)
  },
  SET_UNAME: function (state, value) {
    state.uName = value
    window.sessionStorage.setItem('GameGemUName', value)
  },
  CLEAN_UID: function (state) {
    state.uID = ''
    window.sessionStorage.removeItem('GameGemUID')
  },
  CLEAN_UNAME: function (state) {
    state.uName = ''
    window.sessionStorage.removeItem('GameGemUName')
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
