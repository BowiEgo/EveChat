import * as api from '@/api'

const state = { fdList: [] }

const mutations = {
  SET_FRIEND_LIST (state, fdList) {
    state.fdList = fdList
  },
  SET_FRIEND_IS_CONNECTED (state, req) {
    const { fdId, val } = req
    let fd = state.fdList.find(fd => {
      return fd._id === fdId
    })
    if (typeof val === 'boolean') {
      if (fd) {
        fd.is_connected = val
      } else {
        console.error(`no friend with id: ${fdId}`)
      }
    } else {
      console.error('SET_FRIEND_IS_CONNECTED: error', 'val type is not boolean')
    }
  }
}

const actions = {
  FETCH_FRIEND_LIST ({ commit }, userId) {
    return api.u.getFriendInfoList({
      userId: userId
    }).then(res => {
      const fdList = res.data.data
      console.log('fdList', fdList)
      commit('SET_FRIEND_LIST', fdList)
    })
  },
  SET_FRIEND_IS_CONNECTED ({ commit }, req) {
    commit('SET_FRIEND_IS_CONNECTED', req)
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
