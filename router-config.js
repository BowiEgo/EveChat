'use strict'
// const config = require('config')

const router = require('koa-router')

/* controllers */
const user = require('./controllers/user')
const chat = require('./controllers/chat')

exports.api = router()
  .get('/api/user/list', user.list)
  .post('/api/user/login', user.login)
  .post('/api/user/logout', user.logout)
  .post('/api/user/register', user.register)
  .post('/api/user/search', user.search)
  .get('/api/user/friend', user.getFriendInfoList)
  .post('/api/user/friend/remove', user.removeFriend)
  .post('/api/user/unread/add', user.addUnread)
  .post('/api/user/unread/minus', user.minusUnread)
  .post('/api/user/unread/clear', user.clearUnread)

  .get('/api/chat/list', chat.list)
