const socket = require('socket.io')
const Chat = require('../controllers/chat')

module.exports = function createSocket (server) {
  console.log('createSocket')
  let io = socket(server)
  initChat(io)
}

function initChat (io) {
  let chat = io.of('/chat').on('connection', client => {
    let { userId, targetUserId, chatId } = client.handshake.query
    if (chatId) {
      client.join(chatId)
    } else {
      Chat.newAndSave(userId, targetUserId)
    }
    console.log(`user-${userId} connected to chatroom-${chatId}`)
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
      return new Promise((resolve, reject) => {
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
        console.log('message', res)
        let dialogue = {
          text: res.text,
          user: res.user
        }
        Chat.addDialogue(res.chatId, dialogue)
        chat.to(chatId).emit('fetch message', res)
        resolve()
        // TODO 保存dialogue数据 then(() => {io.emit('fetch message', res)})
      })
    })
    
    // 监听用户退出
    client.on('disconnect', () => {
      console.log('a user disconnected')
      client.disconnect()
    })
  })
}
