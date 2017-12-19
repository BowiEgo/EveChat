'use strict'
const p = require('../proxy')
// const ft = require('../models/fields_table')

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
