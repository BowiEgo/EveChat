import axios from 'axios'
// const querystring = require('querystring')
// import conf from 'config'

const instance = axios.create({
  baseURL: 'http://localhost:9080/api',
  // baseURL: conf.APIPrefix,
  timeout: 25000
})

const createAPI = (url, method, config) => {
  config = config || {}
  if (method === 'get' && url.indexOf('?') === -1) {
    Object.keys(config).map((key, index) => {
      if (index === 0) {
        url += `?${key}=${config[key]}`
      } else {
        url += `&${key}=${config[key]}`
      }
    })
  }
  return instance({
    url,
    method,
    data: {...config}
  })
}

const u = {
  // getList: config => createAPI('/u', 'get', config),
  login: config => createAPI('/user/login', 'post', config),
  logout: config => createAPI('/user/logout', 'post', config),
  register: config => createAPI('/user/register', 'post', config),
  search: config => createAPI('/user/search', 'post', config),
  getFriendInfoList: config => createAPI('/user/friend', 'get', config),
  removeFriend: config => createAPI('/user/friend/remove', 'post', config),
  addUnread: config => createAPI('/user/unread/add', 'post', config),
  minusUnread: config => createAPI('/user/unread/minus', 'post', config),
  clearUnread: config => createAPI('/user/unread/clear', 'post', config)
  // update: config => createAPI('/u/update', 'post', config)
}

const c = {
  list: config => createAPI('/chat/list', 'get', config),
  questChat: config => createAPI('/chat/quest', 'post', config)
}

export {
  u,
  c
}
