const state = {
  userInfo: {}
}

const mutations = {
  SET_SN_BAR_USER_INFO (state, val) {
    console.log('SET_SN_BAR_USER_INFO', val)
    state.userInfo = val
  }
}

const actions = {
  SET_SN_BAR_USER_INFO ({ commit }, val) {
    commit('SET_SN_BAR_USER_INFO', val)
  }
}

const getters = {
  GET_SN_BAR_USER_INFO (state) {
    return state.userInfo
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
