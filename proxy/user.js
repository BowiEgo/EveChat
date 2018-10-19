'use strict'
const _ = require('lodash')
const m = require('../models')
const config = require('config')

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
