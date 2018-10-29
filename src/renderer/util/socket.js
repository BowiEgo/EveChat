import io from 'socket.io-client'

let socketServer = process.env.NODE_ENV !== 'production' ? `http://localhost:3000` : ``

function CallBacks () {
  this.cbs = []
  this.addCb = function (cb) {
    if (typeof cb === 'function' && toString.call(cb) === '[object Function]') {
      this.cbs.push(cb)
    } else {
      console.error('param callback must be a function!')
    }
  }
  this.getCbs = (res) => {
    for (let i = 0, len = this.cbs.length; i < len; i++) {
      let cb = this.cbs[i]
      cb(res)
    }
  }
}

/**
 * connectServerIO
 * createChatIO
 * connectChatIO
 * event: ['']
 * eventListener: ['server connected', 'receive chat']
 */

function SocketIO (options) {
  this.options = options
  return SocketIO.prototype._init()
}

SocketIO.prototype = {
  _init: function () {
    this.serverIO = null
    this.chatIO = []
  },

  on: function (io, eventName, cb) {
    const cbs = new CallBacks()
    cbs.addCb(cb)
    io.on(eventName, res => cbs.getCbs(res))
  },

  connectServerIO: function (userId) {
    console.log('connectServerIO', userId)
    return this._connect('server', {
      userId: userId
    })
  },

  createChatIO: function (userId, targetId) {
    console.log('createChatIO', userId, targetId)
    this.serverIO.emit('create chat', {
      userId: userId,
      userIds: JSON.stringify([userId, targetId])
    })
  },

  connectChatIO: function (userId, chatId) {
    console.log('connectChatIO', userId, chatId)
    return this._connect('chat', {
      userId: userId,
      chatId: chatId
    })
  },

  closeAll: function () {
    console.log('closeAll', this)
    return new Promise((resolve, reject) => {
      Promise.all([
        !!this.serverIO && this.serverIO.close(),
        this.chatIO.map(io => {
          return io.close()
        })
      ]).then(res => {
        this.serverIO = null
        this.chatIO = []
        resolve()
      })
    })
  },

  _connect: function (path, query) {
    let IO = io(`${socketServer}/${path}`, {
      query: query
    }).open()

    return getHandler.call(this, path, query, IO)
  },

  _handleServerConnect: function (query, io) {
    this.on(io, 'server connected', req => {
      console.log('server connected, welcome!')
    })
    this.on(io, 'join chat', chatId => {
      console.log('join chat', chatId)
      this.connectChatIO(query.userId, chatId)
    })
    // this.on(io, 'chat joined', chatId => {
    //   console.log('chat joined', chatId)
    // })
    this.serverIO = io
    return io
  },

  _handleChatConnect: function (query, io) {
    if (this.chatIO.indexOf(io) === -1) {
      this.chatIO.push(io)
    }
    io._id = query.chatId
    return io
  },

  _handleChatCreated: function (query, io) {
    if (this.chatIO.indexOf(io) === -1) {
      this.chatIO.push(io)
    }
    io._id = query.chatId
    return io
  }
}

function getHandler (path, query, io) {
  if (path === 'server') {
    return this._handleServerConnect(query, io)
  } else if (query.chatId) {
    return this._handleChatConnect(query, io)
  } else if (query.userIds) {
    return this._handleChatCreated(query, io)
  }
}

export default SocketIO
