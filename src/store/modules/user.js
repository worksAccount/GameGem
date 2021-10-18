const state = {
  uID: '',
  uName: '',
  uBalance: 0
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
  SET_BALANCE: function (state, value) {
    state.uBalance = value
    window.sessionStorage.setItem('GameGemUBalance', value)
  },
  CLEAN_UID: function (state) {
    state.uID = ''
    window.sessionStorage.removeItem('GameGemUID')
  },
  CLEAN_UNAME: function (state) {
    state.uName = ''
    window.sessionStorage.removeItem('GameGemUName')
  },
  CLEAN_U_BALANCE: function (state) {
    state.uBalance = ''
    window.sessionStorage.removeItem('GameGemUBalance')
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
