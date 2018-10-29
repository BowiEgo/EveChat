'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  nick_name: String,
  head_img: String,
  name: String,
  password: String,
  socketId: String, // 与服务器所链接的socketId
  fd_list: [String],  // 好友列表
  create_at: {
    type: Date,
    default: Date.now
  }
})

schema.index({ name: 1 }, { unique: true })

module.exports = mongoose.model('User', schema)
