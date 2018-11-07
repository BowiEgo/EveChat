'use strict'
const _ = require('lodash')
const m = require('../models')
const config = require('config')
const noopPromise = require('../util/a').noopPromise

const ChatModel = m.Chat

const getByChatId = (chatId) => {
  return ChatModel.findOne({ _id: chatId })
}

const getByUserId = (userId) => {
  return ChatModel.$where(`this.user_list.indexOf("${userId}") !== -1`).exec()
}

const removeById = (id) => {
  return ChatModel.remove({ _id: id })
}

const newAndSave = (userIds) => {
  return new Promise((resolve, reject) => {
    findByUserIds(userIds).then(chats=> {
      if (chats.length > 0) {
        reject('chat already exist !!')
      } else {
        const newChat = new ChatModel()
        newChat.type = 'double'
        newChat.user_list = userIds
        newChat.dialog_list = []
        newChat.save().then(res => {
          resolve(res)
        })
      }
    })
  })
}

const addDialogue = (chatId, dialogue) => {
  dialogue.create_at = Date.now()
  ChatModel.update(
    { _id: chatId },
    { $push: { dialog_list: dialogue }
  }, function (err) {
    if (err) {
      console.log('error', err)
    }
  })
}

const findByUserIds = (userIds) => {
  return ChatModel.where('user_list').eq(userIds).exec()
}

const removeByUserIds = async (userIds) => {
  let chats = await findByUserIds(userIds)
  findByUserIds(userIds).then(chats => {
    console.log('chats', chats)
  })
  return Promise.all(chats.map(chatId => {
    return ChatModel.findOneAndRemove({ _id: chatId })
  }))
}

exports.getByChatId = getByChatId
exports.getByUserId = getByUserId
exports.removeById = removeById
exports.newAndSave = newAndSave
exports.addDialogue = addDialogue
exports.findByUserIds = findByUserIds
exports.removeByUserIds = removeByUserIds
