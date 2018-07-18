module.exports = {
  promiseWrap (promise) {
    if (!promise || !Promise.prototype.isPrototypeOf(promise)) {
      return new Promise((resolve, reject) => {
        reject(new Error('requires promises as the param'))
      }).catch((err) => {
        return [err, null]
      })
    }
    return promise.then(function () {
      return [null, ...arguments]
    }).catch(err => {
      return [err, null]
    })
  },

  successBody (data, msg) {
    return {
      code: 0,
      err: null,
      data: data,
      msg: msg
    }
  },

  errorBody (err, msg) {
    return {
      code: 100,
      err: err,
      data: [],
      msg: msg
    }
  }
}
