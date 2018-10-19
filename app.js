const http = require('http')
const Koa = require('koa')
const koaBody = require('koa-body')
const validate = require('koa-validate')

const middleware = require('./middlewares')
const routerConfig = require('./router-config')
const createSocket = require('./socket')

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
  try {
    createSocket(server)
  } catch (err) {
    console.error('create websocket failed', err)
  }
})
