<template>
  <div class="container">
    <label class="title">请选择环境</label>
    <el-radio-group v-model="env">
      <el-radio-button label="doc"></el-radio-button>
      <el-radio-button label="pre"></el-radio-button>
      <el-radio-button label="prd"></el-radio-button>
    </el-radio-group>
    <el-button class="btn" type="default" @click.native="handlePreviewProject">点击预览</el-button>
    <div v-if="loginImg" class="code">
      <div>请先登录</div>
      <img class="code-img" :src="loginImg" alt="">
    </div>
    <div v-if="preImg" class="code" id="preImg">
      <div>预览二维码</div>
      <img class="code-img" :src="`${base64Prefix}${preImg}`" alt="">
    </div>
  </div>
</template>

<script>
import {openProject, login, previewProject, buildProject} from '../services/index.js'
import {showLoading, hideLoading} from '../utils/index.js'
export default {
  data () {
    return {
      // data表示取得数据的协定名称，image/png 是数据类型名称，base64 是数据的编码方法，逗号后面就是这个image/png文件base64编码后的数据。
      base64Prefix: 'data:image/png;base64,',
      // 登录二维码
      loginImg: '',
      // 预览二维码
      preImg: '',
      // 环境 默认为doc
      env: 'doc'
    }
  },
  methods: {
    handleError (msg) {
      alert(msg)
    },
    async login () {
      const {data: {code, data, msg}} = await login()
      if (code !== 0) {
        this.handleError(msg)
        return code
      }
      this.loginImg = data
      return code
    },
    async previewProject () {
      const {data: {code, data, msg}} = await previewProject()
      if (code !== 0) {
        this.handleError(msg)
        return code
      }
      this.preImg = data
      return code
    },
    async handlePreviewProject () {
      showLoading()
      // 重置二维码
      this.resetImg()
      // 打开微信开发者工具
      const {data: {code}} = await openProject()
      if (code !== 0) {
        // 登录微信开发者工具
        await this.login()
        hideLoading()
        return
      }
      // 根据环境打包
      await buildProject(this.env)
      // 预览
      await this.previewProject()
      hideLoading()
    },
    resetImg () {
      this.loginImg = ''
      this.preImg = ''
    }
  }
}
</script>

<style lang='less'>
  .container {
    display: flex;
    flex-direction: column;
  }
  .title {
    margin-bottom: 30px;
  }
  .btn {
    width: 90%!important;
    margin: 30px auto 30px auto;
  }
  .code {
    display: flex;
    align-items: center;
    flex-direction: column;
    .code-img {
      width: 300px;
      height: 300px;
    }
  }
</style>
