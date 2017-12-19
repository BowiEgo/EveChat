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
  console.log(config)
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
  search: config => createAPI('/user/search', 'post', config)
  // update: config => createAPI('/u/update', 'post', config)
}

export {
  u
}
