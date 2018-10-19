'use strict'
const _ = require('lodash')
const m = require('../models')
const config = require('config')

const ChatModel = m.Chat

const getByChatId = (chatId) => {
  return ChatModel.findOne({ _id: chatId })
}

const getByUserId = (userId) => {
  return ChatModel.$where(`this.user_list.indexOf("${userId}") !== -1`).exec()
}

const newAndSave = (userId, targetUserId) => {
  const chat = new ChatModel()

  chat.user_list = [userId, targetUserId]
  chat.dialog_list = []

  return chat.save()
}

const addDialogue = (chatId, dialogue) => {
  ChatModel.update({ _id: chatId }, { $push: { dialog_list: dialogue } }, function (err) {
    console.log(err)
  })
}

exports.getByChatId = getByChatId
exports.getByUserId = getByUserId
exports.newAndSave = newAndSave
exports.addDialogue = addDialogue
