const fs = require('fs')
const {promiseWrap} = require('../util')
module.exports = {
  readFile (path) {
    return promiseWrap(new Promise((resolve, reject) => {
      var text = fs.readFileSync(path, 'utf8')
      resolve(text)
    }))
  }
}
