const socket = require('socket.io')
const Chat = require('../proxy/chat')
const User = require('../proxy/user')

let serverIO, chatIO
module.exports = function createSocket (server) {
  console.log('createSocket')
  let io = socket(server)
  initServerIO(io)
  initChat(io)
}

function initServerIO (io) {
  serverIO = io.of('/server').on('connection', client => {
    let { userId } = client.handshake.query
    console.log(`${userId} connected serverIO, clientId is ${client.id}`)
    User.saveSocketId(userId, client.id)
    client.emit('server connected')

    client.on('request chat', req => {  // 请求服务器建立聊天室 req: { from: '_id', to: '_id'}
      console.log('request chat', req)
      if (!req.from || !req.to) {
        console.error('request param is illegal')
        return
      }
      Chat.findByUserIds([req.from, req.to])
      .then(chats => {
        if (chats.length > 0) {
          console.log(`chatroom by ${req.from} and ${req.to} is already exist`)
          return
        } else {
          Promise.all([User.getById(req.from), User.getById(req.to)])
          .then(value => {
            let fromUser = value[0], toUser = value[1]
            serverIO.to(toUser.socketId).emit('receive chat', fromUser)
          })
        }
      })
    })

    client.on('create chat', req => { // 新建聊天室
      let { userId, userIds } = req
      userIds = userIds && JSON.parse(userIds)
      Chat.newAndSave(userIds).then(res => {
        console.log('newAndSave-res', res._id)
        chatId = res._id
        joinChat(client, chatId) // 加入聊天室
        client.emit('chat joined', chatId)
        userIds.map(item => {
          if (item !== userId) {
            console.log('fromUserId:', item)
            User.getById(item).then(user => { // 通知发出请求的客户端加入聊天室
              console.log('fromUser', user)
              console.log('join', chatId)
              serverIO.to(user.socketId).emit('join chat', chatId)
            })
          }
        })
      })
    })

    // 监听用户断开连接
    client.on('disconnect', () => {
      disconnect(client, userId)
    })
  })
}

function initChat (io) {
  chatIO = io.of('/chat').on('connection', client => {
    console.log('chat', client.handshake.query)
    let { userId, chatId } = client.handshake.query
    if (chatId) { // 有chatId则为直接加入聊天室
      console.log(`user ${userId} join chat ${chatId}`)
      joinChat(client, chatId)
      client.emit('chat joined', chatId)
    } else {
      client.emit('error', 'params chatId are lack')
      disconnect(client, userId)
    }
    // let chatrooms = []
    // Chat.getByUserId(userId).then(res => {
    //   console.log('chatrooms', res)
    //   chatrooms = res
    //   if (chatrooms.length > 0) {
    //     client.emit('fetch chatrooms', chatrooms)
    //   }
    // })

    // 监听用户发送消息
    client.on('submit message', res => {
      console.log('message', userId, res)
      // let chatrooms = []
      // Chat.getByUserId(userId).then(cr => {
      //   chatrooms = cr
      //   if (chatrooms.length === 0) {
      //     Chat.newAndSave(userId, res)
      //     return
      //   }
      //   client.emit('fetch chatrooms', chatrooms)
      // })
      // client.emit('fetch chatrooms', chatrooms)
      let dialogue = {
        text: res.text,
        user: res.user
      }
      // console.log('dialogue', userId, dialogue)
      Chat.addDialogue(res.chatId, dialogue)
      chatIO.to(chatId).emit('fetch message', res)
    })
    
    // 监听用户退出聊天
    client.on('disconnect', () => {
      disconnect(client, userId)
    })
  })
}

function disconnect (client, userId) {
  client.disconnect()
  console.log(`client ${client.id} of user ${userId || 'unknown'} disconnected`)
}

function joinChat (client, chatId) {
  client.join(chatId)
  console.log(`user-${client.id} connected to chatroom-${chatId}`)
}
