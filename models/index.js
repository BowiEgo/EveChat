'use strict'

const mongoose = require('mongoose')
const config = require('config')

/* ? */
mongoose.Promise = global.Promise

const uri = `mongodb://127.0.0.1:27017/${config.get('db')}`
const database = 
mongoose.connect(uri, {
  server: {
    /* ? */
    poolSize: 20   // Maintain up to 20 socket connection
  }
})

database.then(
  () => {
    console.log(`connect to db ${config.get('db')} successed`)
  },
  err => {
    console.error('connect to $s error: ', config.get('db'), err.message)
    /* ? */
    process.exit(1)
  }
)

exports.User = require('./user')
exports.Chat = require('./chat')
