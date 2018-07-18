const axios = require('axios')
const config = require('../../config')
const isProduction = process.env.NODE_ENV === 'production'
const host = isProduction ? config.build.host : config.dev.host
/**
 * 打开项目
 */
export function openProject () {
  return new Promise((resolve, reject) => {
    axios.get(`${host}:9871/api/open`)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * 登录微信开发者账号
 */
export function login () {
  return new Promise((resolve, reject) => {
    axios.get(`${host}:9871/api/login`)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * 预览项目
 */
export function previewProject () {
  return new Promise((resolve, reject) => {
    axios.get(`${host}:9871/api/preview`)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * 编译项目
 */
export function buildProject () {
  return new Promise((resolve, reject) => {
    axios.get(`${host}:9871/api/build`)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * 上传
 */
export function upload () {
  return new Promise((resolve, reject) => {
    axios.get(`${host}:9871/api/upload`)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
