const state = {
  nick_name: null,
  head_img: null,
  name: null,
  _id: null,
  unread_num_list: null
}

const mutations = {
  SET_USER (state, obj) {
    state.nick_name = obj.nick_name
    state.head_img = obj.head_img
    state.name = obj.name
    state._id = obj._id
    state.unread_num_list = obj.unread_num_list
  }
}

const actions = {
  SET_USER ({ commit }, obj) {
    console.log('obj: ', obj)
    commit('SET_USER', obj)
  }
}

const getters = {
  GET_USER (state) {
    return state
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
