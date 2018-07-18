const {promiseWrap, successBody, errorBody} = require('../util')
const {INSTALL_PATH, PROJECT_PATH, PORT_PATH, PORT_FILE_NAME, HOST} = require('../const')
const {readFile} = require('../util/nodeApi')
const shell = require('shelljs')
const axios = require('axios')
module.exports = {
  /**
   * 根据环境对项目进行打包
   * @param env [doc, pre, prd]
   * @returns {*}
   */
  build (env) {
    return promiseWrap(new Promise((resolve, reject) => {
      // 进入项目目录
      shell.cd(PROJECT_PATH)
      // 执行打包命令
      shell.exec(`npm run build:${env}`, function (code, stdout, stderr) {
        resolve(stdout)
      })
    }))
  },
  /**
   * 打开微信开发者工具
   * @returns {*}
   */
  open () {
    return promiseWrap(new Promise((resolve, reject) => {
      // 进入项目目录
      shell.cd(INSTALL_PATH)
      // 执行微信开发者工具接口“命令行启动工具”
      shell.exec(`./cli -o ${PROJECT_PATH}`, function (code, stdout, stderr) {
        if (stderr) return reject(stderr)
        resolve(stdout)
      })
    }))
  },
  /**
   * 获取微信开发者工具端口号
   * @returns {Promise<*>}
   */
  async getPort () {
    shell.cd(PORT_PATH)
    // http 服务在工具启动后自动开启，HTTP 服务端口号在用户目录下记录，可通过检查用户目录、检查用户目录下是否有端口文件及尝试连接来判断工具是否安装/启动。
    const [err, data] = await readFile(PORT_FILE_NAME)
    return err ? errorBody(err, '读取端口号文件失败') : successBody(data, '读取端口号文件成功')
  },
  /**
   * 微信开发者工具进行登录
   * @returns {*}
   */
  login () {
    return promiseWrap(new Promise(async (resolve, reject) => {
      // 获取端口号
      const portData = await module.exports.getPort()
      if (portData.code !== 0) {
        reject(portData)
        return
      }
      const port = portData.data
      axios.get(`http://${HOST}:${port}/login?format=base64`)
        .then(res => {
          resolve(res.data)
        })
        .catch(e => {
          reject(e)
        })
    }))
  },
  /**
   * 微信开发者工具获取预览码
   * @returns {*}
   */
  preview () {
    return promiseWrap(new Promise(async (resolve, reject) => {
      const portData = await module.exports.getPort()
      if (portData.code !== 0) {
        reject(portData)
        return
      }
      const port = portData.data
      axios.get(`http://${HOST}:${port}/preview?format=base64&projectpath=${encodeURIComponent(PROJECT_PATH)}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(e => {
          reject(e)
        })
    }))
  },
  /**
   * 微信开发者工具上传
   * @return {*}
   */
  upload () {
    return promiseWrap(new Promise(async (resolve, reject) => {
      const portData = await module.exports.getPort()
      if (portData.code !== 0) {
        reject(portData)
        return
      }
      const port = portData.data
      axios.get(`http://${HOST}:${port}/upload?projectpath=${encodeURIComponent(PROJECT_PATH)}&version=1.2.0&desc=update`)
        .then(res => {
          resolve(res.data)
        })
        .catch(e => {
          reject(e)
        })
    }))
  }
}
