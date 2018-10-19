'use strict'
const _ = require('lodash')
const p = require('../proxy')
const ft = require('../models/fields_table')

const chatProxy = p.Chat

exports.getByChatId = (chatId) => {
  return chatProxy.getByChatId(chatId)
}

exports.getByUserId = (userId) => {
  return chatProxy.getByUserId(userId)
}

exports.newAndSave = (userId) => {
  return chatProxy.newAndSave(userId)
}

exports.addDialogue = (chatId, dialogue) => {
  return chatProxy.addDialogue(chatId, dialogue)
}

exports.list = async (ctx, next) => {
  const userId = ctx.query['userId']
  let chats = await chatProxy.getByUserId(userId)
  ctx.body = ctx.util.resuccess({
    data: chats.map(item => {
      return _.pick(item, ft.chat)
    }),
    message: '查找成功'
  })
}
