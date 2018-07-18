const Router = require('koa-router')
// 业务逻辑
const wx = require('../controller/wx')
const router = new Router({
  // 接口前缀 比如open接口 请求路径就是/api/open
  prefix: '/api'
})
router.get('/open', wx.open)
  .get('/login', wx.login)
  .get('/preview', wx.preview)
  .get('/build', wx.build)
module.exports = router