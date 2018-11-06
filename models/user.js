'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  nick_name: String,
  head_img: String,
  name: String,
  password: String,
  socket_id: String, // 与服务器所链接的socketId
  fd_list: [String],  // 好友列表
  chat_ids: [String], // 聊天室Id列表
  unread_num_list: Object, // 聊天室的未读消息数 { <chatId>: 10, ... }
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({ name: 1 }, { unique: true })

module.exports = mongoose.model('User', schema)
