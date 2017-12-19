'use strict'
// const config = require('config')

const router = require('koa-router')

/* controllers */
const user = require('./controllers/user')

exports.api = router()
  .post('/api/user/login', user.login)
  .post('/api/user/logout', user.logout)
  .post('/api/user/register', user.register)
  .post('/api/user/search', user.search)
