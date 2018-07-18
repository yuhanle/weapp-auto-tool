// 微信开发者工具接口调用逻辑
const {open, login, preview, build, upload} = require('../util/wxToolApi')
// 处理成功失败返回格式的工具
const {successBody, errorBody} = require('../util')
class WxController {
  /**
   * 根据环境对项目进行打包
   * @returns {Promise<void>}
   */
  static async build (ctx) {
    // 前端传过来的get参数
    const query = ctx.request.query
    if (!query || !query.env) {
      ctx.body = errorBody(null, '构建项目失败')
      return
    }
    const [err, data] = await build(query.env)
    ctx.body = err ? errorBody(err, '构建项目失败') : successBody(data, '构建项目成功')
  }
  /**
   * 打开微信开发者工具
   * @returns {Promise<void>}
   */
  static async open (ctx) {
    const [err, data] = await open()
    ctx.body = err ? errorBody(err, '打开微信开发者工具失败') : successBody(data, '打开微信开发者工具成功')
  }
  /**
   * 登录微信开发者工具
   * @returns {Promise<void>}
   */
  static async login (ctx) {
    const [err, data] = await login()
    ctx.body = err ? errorBody(err, '登录二维码返回失败') : successBody(data, '登录二维码返回成功')
  }
  /**
   * 查看预览码
   * @returns {Promise<void>}
   */
  static async preview (ctx) {
    const [err, data] = await preview()
    ctx.body = err ? errorBody(err, '预览二维码返回失败') : successBody(data, '预览二维码返回成功')
  }

  static async upload (ctx) {
    const [err, data] = await upload()
    ctx.body = err ? errorBody(err, '上传版本返回失败') : successBody(data, '上传版本返回成功')
  }
}
module.exports = WxController
