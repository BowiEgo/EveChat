const state = {
  friendReQuest: [],
  unreadMsgNum: 0
}

const mutations = {
  ADD_FRIEND_REQUEST (state, obj) {
    state.friendReQuest.push(obj)
  }
}

const actions = {
  ADD_FRIEND_REQUEST ({ commit }, obj) {
    commit('ADD_FRIEND_REQUEST', obj)
  }
}

const getters = {
  GET_FRIEND_REQUEST (state) {
    return state.friendReQuest
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
