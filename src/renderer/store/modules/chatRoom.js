import * as api from '@/api'

const state = {
  list: []
}

const mutations = {
  SET_CHAT_ROOMS (state, arr) {
    state.list = []
    arr.map((item, index) => {
      item.active = index === 0
      state.list.push(item)
    })
  },
  ADD_CHAT_ROOM (state, obj) {
    state.list.unshift(obj)
  },
  ACTIVE_CHAT_ROOM (state, id) {
    state.list.map(item => {
      item.active = item._id === id
    })
  },
  ADD_DIALOGUE (state, obj) {
    let { id, dialogue } = obj
    let room = state.list.find(item => {
      return item._id === id
    })
    if (room) {
      room.dialog_list.push(dialogue)
    }
  }
}

const actions = {
  FETCH_CHAT_ROOMS ({ commit }, userId) {
    return api.c.list({
      userId: userId
    }).then(res => {
      const chatRooms = res.data.data
      commit('SET_CHAT_ROOMS', chatRooms)
    })
  },
  SET_CHAT_ROOMS ({ commit }, arr) {
    commit('SET_CHAT_ROOMS', arr)
  },
  ADD_CHAT_ROOM ({ commit }, obj) {
    commit('ADD_CHAT_ROOM', obj)
  },
  ACTIVE_CHAT_ROOM ({ commit }, id) {
    commit('ACTIVE_CHAT_ROOM', id)
  },
  ADD_DIALOGUE ({ commit }, obj) {
    commit('ADD_DIALOGUE', obj)
  }
}

const getters = {
  GET_CHAT_ROOMS (state) {
    return Array.from(state.list)
  },
  // GET_CHAT_INFO (state) {
  //   return state.list.map(item => {
  //   })
  // },
  GET_ACTIVED_CHAT_ROOM (state) {
    for (let i in state.list) {
      let item = state.list[i]
      if (item.active) {
        return item
      }
    }
    return ''
  },
  GET_ACTIVED_CHAT_ROOM_ID (state) {
    for (let i in state.list) {
      let item = state.list[i]
      if (item.active) {
        state.activeId = item._id
        return item._id
      }
    }
    return ''
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
