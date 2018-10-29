const state = { io: null }

const mutations = {
  SET_SERVER_IO (state, io) {
    state.io = io
  }
}

const actions = {
  SET_SERVER_IO ({ commit }, io) {
    commit('SET_SERVER_IO', io)
  }
}

const getters = {
  GET_SERVER_IO (state) {
    return state.io
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
