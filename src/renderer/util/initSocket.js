// import Vue from 'vue'
import io from 'socket.io-client'

export default function initSocket (user) {
  console.log('initSocket')
  let socketServer = process.env.NODE_ENV !== 'production'
    ? `http://localhost:3000` : ``
  console.log('socketServer', socketServer)
  return io.connect(`${socketServer}/chat?userId=${user._id}`)
}
