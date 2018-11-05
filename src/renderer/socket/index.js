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

function getHandler (path, query, io) {
  if (path === 'server') {
    return this._handleServerConnect(query, io)
  }
}

export default function SocketIO (options) {
  return SocketIO.prototype._init(options)
}

SocketIO.prototype = {
  _init: function (options) {
    this.options = options || {}
    this.serverIO = null
    this.userId = this.options.userId || ''
  },

  _connect: function (path, query) {
    let IO = io(`${socketServer}/${path}`, {
      query: query
    }).open()
    return getHandler.call(this, path, query, IO)
  },

  _handleServerConnect: function (query, io) {
    this.on(io, 'disconnect', res => {
      console.log('disconnect', res)
    })
    this.on(io, 'SERVER_CONNECTED', res => {
      console.log('SERVER_CONNECTED, welcome!')
    })
    this.on(io, 'RECEIVE_CHAT_REQUEST', res => {
      console.log('RECEIVE_CHAT_REQUEST', res)
      this.createChat(query.userId, res._id)
    })
    this.on(io, 'JOIN_CHAT', chatId => {
      console.log('JOIN_CHAT', chatId)
      this.serverIO.emit('CONNECT_CHAT', chatId, res => {
        console.log('CONNECT_CHAT_RES', res)
      })
    })
    this.on(io, 'JOIN_CHAT_SUCCESS', chatId => {
      console.log('JOIN_CHAT_SUCCESS', chatId)
    })
    this.on(io, 'RECEIVE_MSG', msg => {
      console.log('RECEIVE_MSG', msg)
    })
    this.serverIO = io
    return io
  },

  on: function (io, eventName, cb) {
    if (arguments.length < 3) {
      io = this.serverIO
      eventName = arguments[0]
      cb = arguments[1]
    }
    const cbs = new CallBacks()
    cbs.addCb(cb)
    io.on(eventName, res => cbs.getCbs(res))
  },

  close: function () {
    console.log('CLOSE', this)
    return new Promise((resolve, reject) => {
      Promise.all([
        !!this.serverIO && this.serverIO.close()
      ]).then(res => {
        this.serverIO = null
        resolve()
      })
    })
  },

  connectServer: function (userId) {
    this.userId = userId || this.userId
    console.log('CONNECT_SERVER', this.userId)
    return this._connect('server', {
      userId: this.userId
    })
  },

  createChat: function (fromUserId, toUserId) {
    this.serverIO.emit('CREATE_CHAT', {
      userId: fromUserId,
      targetIds: [toUserId]
    }, res => {
      console.log(res)
    })
  },

  sendRequest: function (fromUserId, toUserId) {
    this.serverIO.emit('REQUEST_CHAT', {
      from: fromUserId,
      to: toUserId
    })
  },

  sendMsg: function (chatId, msg) {
    console.log('SEND_MSG', chatId, msg)
    this.serverIO.emit('SEND_MSG', {
      chatId: chatId,
      msg: msg
    }, res => {
      console.log(res)
    })
  }
}
