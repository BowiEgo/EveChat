// import Vue from 'vue'
import io from 'socket.io-client'

// export default function connectChat (userId, chatIds) {
//   console.log('initSocket', userId, chatIds)
//   let socketServer = process.env.NODE_ENV !== 'production'
//     ? `http://localhost:3000` : ``
//   console.log('socketServer', socketServer)
//   Vue.prototype.$sockets = chatIds.map(chatId => {
//     return io.connect(`${socketServer}/chat?userId=${userId}&chatId=${chatId}`)
//   })
//   // Vue.prototype.$socket = io.connect(`${socketServer}/chat?userId=${user._id}&chatId=${}`)
// }

export function createChatSocket (userId, targetUserId, chatId) {
  console.log('createChatSocket', chatId)
  let socketServer = process.env.NODE_ENV !== 'production'
    ? `http://localhost:3000` : ``
  return io.connect(`${socketServer}/chat?userId=${userId}&targetUserId=${targetUserId}&chatId=${chatId}`)
}
