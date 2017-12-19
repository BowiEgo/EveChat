const http = require('http')
const Koa = require('koa')
const koaBody = require('koa-body')
const validate = require('koa-validate')
const socket = require('socket.io')

const middleware = require('./middlewares')
const routerConfig = require('./router-config')

/* controllers */
const Chat = require('./controllers/chat')

const app = new Koa()

validate(app)

app
.use(koaBody())
.use(middleware.common)
.use(routerConfig.api.routes())

app.on('error', function(err) {
  console.log(err)
})

const server = http.createServer(app.callback())

server.listen(3000, () => {
  console.log('Server listening at port 3000')
})

//socket

let io = socket(server)
let chat = io
  .of('/chat')
  .on('connection', client => {
    let userId = client.handshake.query.userId
    console.log(`${userId} connected`)
    let chatrooms = []
    Chat.getByUserId(userId).then(res => {
      console.log('chatrooms', res)
      chatrooms = res
      if (chatrooms.length > 0) {
        client.emit('fetch chatrooms', chatrooms)
      }
    })
    client.on('submit message', res => {
      let chatrooms = []
      Chat.getByUserId(userId).then(cr => {
        chatrooms = cr
        if (chatrooms.length === 0) {
          Chat.newAndSave(userId, res)
          return
        }
        client.emit('fetch chatrooms', chatrooms)
      })
      client.emit('fetch chatrooms', chatrooms)
      console.log('message', res)
      chat.emit('fetch message', res)
      let dialogue = {
        text: res.text,
        user: res.user
      }
      Chat.addDialogue(res.chatId, dialogue)
      // TODO 保存dialogue数据 then(() => {io.emit('fetch message', res)})
    })
    client.on('disconnect', () => {
      console.log('a user disconnected')
      client.disconnect()
    })
  })
