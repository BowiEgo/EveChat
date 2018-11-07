const state = {
  showInfoBar: true,
  showSNBar: false,
  isConnected: true
}

const mutations = {
  TOGGLE_INFO_BAR (state, val) {
    state.showInfoBar = val
  },
  TOGGLE_SN_BAR (state, val) {
    state.showSNBar = val
  },
  TOGGLE_IS_CONNECTED (state, val) {
    state.isConnected = val
  }
}

const actions = {
  TOGGLE_INFO_BAR ({ commit }, val) {
    commit('TOGGLE_INFO_BAR', val)
  },
  TOGGLE_SN_BAR ({ commit }, val) {
    commit('TOGGLE_SN_BAR', val)
  },
  TOGGLE_IS_CONNECTED ({ commit }, val) {
    commit('TOGGLE_IS_CONNECTED', val)
  }
}

const getters = {
  GET_INFO_BAR_STATE (state) {
    return state.showInfoBar
  },
  GET_SN_BAR_STATE (state) {
    return state.showSNBar
  },
  GET_IS_CONNECTED (state) {
    return state.isConnected
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
