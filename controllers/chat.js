'use strict'
const _ = require('lodash')
const p = require('../proxy')
const ft = require('../models/fields_table')

const chatProxy = p.Chat

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

exports.quest = async (ctx, next) => {
  const fromUserId = ctx.checkBody('from').notEmpty().value
  const toUserId = ctx.checkBody('to').notEmpty().value
}
