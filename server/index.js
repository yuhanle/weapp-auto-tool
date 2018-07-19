const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const app = new Koa()
const port = 9871

app.use(bodyParser())

// 处理静态资源 这里是前端build好之后的目录
app.use(koaStatic(
  path.resolve(__dirname, '../dist')
))

// 路由处理接口
app.use(router.routes()).use(router.allowedMethods())

// 监听端口
app.listen(port)
console.log(`[demo] start-quick is starting at port ${port}`)
