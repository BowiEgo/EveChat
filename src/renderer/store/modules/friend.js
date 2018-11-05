import * as api from '@/api'

const state = { fdList: [] }

const mutations = {
  SET_FRIEND_LIST (state, fdList) {
    state.fdList = fdList
  }
}

const actions = {
  FETCH_FRIEND_LIST ({ commit }, userId) {
    return api.u.getFriendInfoList({
      userId: userId
    }).then(res => {
      const fdList = res.data.data
      console.log('fdList', res)
      commit('SET_FRIEND_LIST', fdList)
    })
  }
}

const getters = {
  GET_FRIEND_LIST (state) {
    return Array.from(state.fdList)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
