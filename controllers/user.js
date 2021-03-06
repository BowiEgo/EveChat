'use strict'
const _ = require('lodash')

const p = require('../proxy')
const util = require('../util')
const ft = require('../models/fields_table')

const userProxy = p.User

exports.list = async (ctx, next) => {
  let users = await userProxy.all()
  ctx.body = ctx.util.resuccess({
    data: users.map(item => {
      return _.pick(item, ft.user)
    }),
  message: '查找成功'})
}

exports.register = async (ctx, next) => {
  const name = ctx.checkBody('username').notEmpty().len(4, 20).value
  const password = ctx.checkBody('password').notEmpty().len(6, 20).value

  if (ctx.errors) {
    let message = ctx.errors.map(item => {
      if (item.username === 'username can not be empty.') item.username = '用户名不能为空'
      if (item.password === 'password can not be empty.') item.password = '密码不能为空'
      return item
    })
    ctx.body = ctx.util.refail({code: 10001, data: null, message: message})
    return
  }

  let user = await userProxy.getByName(name)
  //判断用户是否已存在
  if (!_.isEmpty(user)) {
    ctx.body = ctx.util.refail({message: '注册失败，用户已存在'})
    return
  }

  const npassword = await util.bhash(password)

  await userProxy.newAndSave(name, npassword)
  
  user = await userProxy.getByName(name)

  ctx.body = ctx.util.resuccess({data: _.pick(user, ft.user), message: '注册成功'})
}

exports.login = async (ctx, next) => {
  const name = ctx.checkBody('username').notEmpty().len(4, 20).value
  const password = ctx.checkBody('password').notEmpty().len(6, 20).value
  
  if (ctx.errors) {
    let message = ctx.errors.map(item => {
      if (item.username === 'username can not be empty.') item.username = '用户名不能为空'
      if (item.password === 'password can not be empty.') item.password = '密码不能为空'
      return item
    })
    ctx.body = ctx.util.refail({code: 10001, data: null, message: message})
    return
  }

  let user = await userProxy.getByName(name)
  // //判断用户是否已存在
  if (_.isEmpty(user)) {
    ctx.body = ctx.util.refail({message: [{username: '用户不存在'}]})
    return
  }

  // //验证密码
  const verifyPassword = await util.bcompare(password, user.password)

  if (!verifyPassword) {
    ctx.body = ctx.util.refail({message: [{password: '密码不正确'}]})
    return
  }

  // let token = await ctx.Token.list({
  //   id: user.id
  // })

  // if (_.isEmpty(token)) {
  //   token = [yield this.Token.create({ id: user.id })]
  // }

  // user.token = token[0].jwt
  
  ctx.body = ctx.util.resuccess({data: _.pick(user, ft.user), message: '登陆成功'})
}

exports.logout = async (ctx, next) => {
}

exports.search = async (ctx, next) => {
  const name = ctx.checkBody('username').notEmpty().len(4, 20).value

  let user = await userProxy.getByName(name)
  // //判断用户是否已存在
  if (_.isEmpty(user)) {
    ctx.body = ctx.util.refail({message: [{username: '用户不存在'}]})
    return
  }

  ctx.body = ctx.util.resuccess({data: _.pick(user, ft.user), message: '查找成功'})
}

exports.getFriendInfoList = async(ctx, next) => {
  const userId = ctx.query['userId']
  let friendList = await userProxy.getFriendInfoList(userId)
  ctx.body = ctx.util.resuccess({
    data: friendList.map(user => {
      return _.pick(user, ft.user)
    }),
    message: '查找成功'
  })
}

exports.removeFriend = async (ctx, next) => {
  const userId = ctx.checkBody('userId').notEmpty().value
  const friendId = ctx.checkBody('friendId').notEmpty().value
  console.log('removeFriend-controller', userId, friendId)
  let user = await userProxy.removeFriend(userId, friendId)
  let targetUser = await userProxy.removeFriend(friendId, userId)
  // //判断用户是否已存在
  if (_.isEmpty(user)) {
    ctx.body = ctx.util.refail({message: [{username: '用户不存在'}]})
    return
  }

  ctx.body = ctx.util.resuccess({data: _.pick(user, ft.user), message: '删除好友成功'})
}

exports.addUnread = async (ctx, next) => {
  const userId = ctx.checkBody('userId').notEmpty().value
  const chatId = ctx.checkBody('chatId').notEmpty().value
  console.log('addUnread-controller', userId, chatId)

  let user = await userProxy.addUnread(userId, chatId)
  ctx.body = ctx.util.resuccess({data: _.pick(user, ft.user), message: '增加未读消息数成功'})
}

exports.minusUnread = async (ctx, next) => {
  const userId = ctx.checkBody('userId').notEmpty().value
  const chatId = ctx.checkBody('chatId').notEmpty().value
  console.log('minusUnread-controller', userId, chatId)

  let user = await userProxy.minusUnread(userId, chatId)
  ctx.body = ctx.util.resuccess({data: _.pick(user, ft.user), message: '减少未读消息数成功'})
}

exports.clearUnread = async (ctx, next) => {
  const userId = ctx.checkBody('userId').notEmpty().value
  const chatId = ctx.checkBody('chatId').notEmpty().value
  console.log('clearUnread-controller', userId, chatId)

  let user = await userProxy.clearUnread(userId, chatId)
  ctx.body = ctx.util.resuccess({data: _.pick(user, ft.user), message: '清空未读消息数成功'})
}
