'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  user_list: [String],
  // dialogue_list: [{ user_name: 'test', create_at: Date.now, text: 'test'}],   // {user_name: '', create_at: '', text: ''}
  dialog_list: [{}],
  chatId: String,
  create_at: {
    type: Date,
    default: Date.now
  }
})

// schema.index({ name: 1 }, { unique: true })

module.exports = mongoose.model('Chat', schema)
