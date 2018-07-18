import { Loading } from 'element-ui'
let loadingInstance
/**
 * 显示HUD
 */
export function showLoading () {
  loadingInstance = Loading.service({
    text: '疯狂打码中'
  })
}
/**
 * 隐藏HUD
 */
export function hideLoading () {
  loadingInstance.close()
  loadingInstance = null
}
