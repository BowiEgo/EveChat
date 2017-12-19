const state = {
  showInfoBar: true,
  showSNBar: false
}

const mutations = {
  TOGGLE_INFO_BAR (state, val) {
    console.log('TOGGLE_INFO_BAR', val)
    state.showInfoBar = val
  },
  TOGGLE_SN_BAR (state, val) {
    console.log('TOGGLE_SN_BAR', val)
    state.showSNBar = val
  }
}

const actions = {
  TOGGLE_INFO_BAR ({ commit }, val) {
    commit('TOGGLE_INFO_BAR', val)
  },
  TOGGLE_SN_BAR ({ commit }, val) {
    commit('TOGGLE_SN_BAR', val)
  }
}

const getters = {
  GET_INFO_BAR_STATE (state) {
    return state.showInfoBar
  },
  GET_SN_BAR_STATE (state) {
    return state.showSNBar
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
