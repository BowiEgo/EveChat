'use strict'
const _ = require('lodash')
const m = require('../models')
const config = require('config')

const ChatProxy = require('./chat')
const UserModel = m.User

exports.all = () => {
  return UserModel.find({})
}

exports.newAndSave = (name, password, nickName, headImg) => {
  const user = new UserModel()
  const len = config.get('gravatar').length

  user.name = name
  user.password = password
  user.nick_name = nickName || _.now()
  user.head_img = headImg || config.get('gravatar')[_.random(0, len - 1)]

  return user.save()
}

exports.getByName = (userName) => {
  console.log('getByName: ', userName)
  return UserModel.findOne({ name: userName })
}

exports.getById = (userId) => {
  return UserModel.findById(userId)
}

exports.saveSocketId = async (userId, socketId) => {
  console.log('saveSocketId', userId, socketId)
  let user = await UserModel.findById(userId)
  user.socket_id = socketId
  return user.save()
}

// exports.getChatIdsById = async (userId) => {
//   return await UserModel.findById(userId).chat_ids
// }

exports.addChatId = async (userId, chatId) => {
  console.log('addChatId', userId, chatId)
  let user = await UserModel.findById(userId)
  user.chat_ids.push(chatId)
  return user.save()
}

exports.removeChatId = async (userId, chatId) => {
  console.log('removeChatId', userId, chatId)
  let user = await UserModel.findById(userId)
  let idx = user.chat_ids.indexOf(chatId)
  if (idx > -1) {
    user.chat_ids.splice(idx, 1)
  }
  return user.save()
}

exports.clearChatId = async (userId) => {
  let user = await UserModel.findById(userId)
  user.chat_ids = []
  return user.save()
}

exports.addFriend = async (userId, friendIds) => {
  console.log('addFriend', userId, friendIds)
  let user = await UserModel.findById(userId)
  let fd_list = user.fd_list
  for (let i = 0, len = friendIds.length; i < len; i++) {
    let fd = friendIds[i]
    if(fd_list.indexOf(fd) === -1) {
      fd_list.push(fd)
    }
  }
  return user.save()
}

exports.clearFriend = async (userId) => {
  console.log('clearFriend', userId)
  let user = await UserModel.findById(userId)
  user.fd_list = []
  return user.save()
}

exports.getFriendInfoList = async (userId) => {
  console.log('getFriendInfoList', userId)
  let user = await UserModel.findById(userId)
  let fd_list = user ? user.fd_list : []
  let result = []
  let p = fd_list.map(id => {
    return UserModel.findById(id)
  })
  return Promise.all(p)
}

exports.removeFriend = async (userId, friendId) => {
  console.log('removeFriend', userId, friendId)
  let user = await UserModel.findById(userId)
  await ChatProxy.removeByUserIds([userId, friendId])
  user.fd_list.splice(user.fd_list.indexOf(friendId), 1)
  return user.save()  
}

exports.addUnread = async (userId, chatId) => {
  console.log('addUnread', userId, chatId)
  let user = await UserModel.findById(userId)
  let num = user.unread_num_list[chatId]
  let tmp = user.unread_num_list ? user.unread_num_list : {}

  if (num === null || num === undefined) {
    tmp[chatId] = 1
  } else {
    tmp[chatId] = num + 1
  }
  await UserModel.update(
    { _id: userId },
    { $set: { 'unread_num_list': tmp  } }
  )
  return user.save()  
}

exports.minusUnread = async (userId, chatId) => {
  console.log('minusUnread', userId, chatId)
  let user = await UserModel.findById(userId)
  let num = user.unread_num_list[chatId]
  
  if (num === null || num === undefined) {
    let tmp = {}
    tmp[chatId] = 0
    Object.assign(user.unread_num_list, tmp)
  } else {
    --num
  }
  return user.save()  
}

exports.clearUnread = async (userId, chatId) => {
  console.log('clearUnread', userId, chatId)
  let user = await UserModel.findById(userId)
  let num = user.unread_num_list[chatId]
  let tmp = user.unread_num_list ? user.unread_num_list : {}

  tmp[chatId] = 0
  await UserModel.update(
    { _id: userId },
    { $set: { 'unread_num_list': tmp  } }
  )
  return user.save()  
}
