const socket = require('socket.io')
const Chat = require('../proxy/chat')
const User = require('../proxy/user')

let serverIO, chatIO
module.exports = function createSocket (server) {
  console.log('createSocket')
  let io = socket(server)
  initServerIO(io)
}

const event_list = {
  SERVER_CONNECTED: 'SERVER_CONNECTED',
  JOIN_CHAT: 'JOIN_CHAT',
  JOIN_CHAT_SUCCESS: 'JOIN_CHAT_SUCCESS',
  RECEIVE_MSG: 'RECEIVE_MSG',
  RECEIVE_CHAT_REQUEST: 'RECEIVE_CHAT_REQUEST',
  MEMBER_CONNECT: 'MEMBER_CONNECT',
  MEMBER_DISCONNECT: 'MEMBER_DISCONNECT',
  ERROR: 'ERROR'
}

function EMIT_EVENT (socket, eventName, params) {
  if (!event_list[eventName]) {
    console.log(`unavailable eventname ${eventName}!`)
  }
  socket.emit(event_list[eventName], params)
}

function initServerIO (io) {
  serverIO = io.of('/server').on('connection', client => {
    let { userId } = client.handshake.query
    console.log(`${userId} connected serverIO, clientId is ${client.id}`)
    User.saveSocketId(userId, client.id)
    EMIT_EVENT(client, 'SERVER_CONNECTED')
    // 客户端加入聊天室
    User.setIsConnected(userId, true)
    User.getById(userId).then(user => {
      user.chat_ids.forEach(chatId => {
        client.join(chatId)
        EMIT_EVENT(serverIO.to(chatId), 'MEMBER_CONNECT', userId)
        // EMIT_EVENT(
        //   serverIO.to(chatId),
        //   'RECEIVE_MSG', {
        //     chatId: chatId,
        //     text: `client ${userId} joined chat ${chatId}`,
        //     user: {
        //       _id: userId
        //     }
        //   }
        // )
      })
    })

    client.on('REQUEST_CHAT', req => {  // 请求服务器建立聊天室 req: { from: '_id', to: '_id'}
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
            EMIT_EVENT(serverIO.to(toUser.socket_id), 'RECEIVE_CHAT_REQUEST', fromUser)
            console.log(`client ${toUser.name} receive chat request from ${fromUser.name}`)
          })
        }
      })
    })

    client.on('CREATE_CHAT', (req, fn) => { // 新建聊天室
      let { userId, targetIds } = req
      let allIds = [userId, ...targetIds]
      fn('received')
      Chat.findByUserIds(allIds)
      .then(chats => {
        if (chats.length > 0) {
          console.log(`chatroom by ${userId} and ${targetIds} is already exist`)
          return
        } else {
          Chat.newAndSave(allIds).then(res => {
            console.log('newAndSave-res', res._id)
            let chatId = res._id
            allIds.map(userId => {
              console.log('userId', userId)
              User.getById(userId).then(user => {
                console.log(`user ${user.name} join chat`, chatId)
                User.addChatId(userId, chatId).then(() => {
                  let idsTemp = allIds.filter(id => {
                    return id !== userId
                  })
                  console.log('add', userId, allIds, idsTemp)
                  User.addFriend(userId, idsTemp).then(() => {
                    EMIT_EVENT(serverIO.to(user.socket_id), 'JOIN_CHAT', chatId)
                  })
                })
              })
            })
          })
        }
      })
    })

    client.on('CONNECT_CHAT', (chatId, fn) => {
      client.join(chatId, () => {
        let chats = Object.keys(client.rooms)
        fn(client.rooms)
      })
      client.emit('JOIN_CHAT_SUCCESS', chatId)
    })

    client.on('SEND_MSG', (res, fn) => {
      console.log('send msg', res)
      let { chatId, msg } = res
      let dialogue = {
        chatId: chatId,
        text: msg.text,
        user: msg.user
      }
      Chat.addDialogue(chatId, dialogue)
      EMIT_EVENT(serverIO.to(chatId), 'RECEIVE_MSG', dialogue)
    })

    // 监听用户断开连接
    client.on('disconnect', () => {
      disconnect(client, userId)
      User.setIsConnected(userId, false)
      User.getById(userId).then(user => {
        user.chat_ids.forEach(chatId => {
          EMIT_EVENT(serverIO.to(chatId), 'MEMBER_DISCONNECT', userId)
        })
      })
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
