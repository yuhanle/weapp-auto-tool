# auto-wx-tool

一个自动生成微信小程序预览码的工具

## Preview

| 预览              |         主页      | 登录              |
| ----------------- | ----------------- | ----------------- |
| ![](./docs/2.png) | ![](./docs/1.png) | ![](./docs/3.png) |

> 开发小程序的朋友们随时都会听到一句话：“喂，快给我打一个xxx环境的预览码”，无论你正在干什么，都得赶紧地回一句：“稍等，这就给你打码……”
> 然后苦逼的你build了一个xxx环境的包，打开了微信开发者工具，点了一下预览，等了一下，预览码出来了，你复制丢给你的爸爸们。
> 终于有一天，你正在专心致志做一些不可描述的事情时，“喂，快给我打一个xxx环境的预览码”，这时你内心怒吼了一句：“老子不给你打码！你自己打去！”

<p align="right">
-- 摘自《喂，快给我打一个小程序预览码》
</p>

------

## Start Server

``` bash
# install dependencies
npm install

# start server
node server
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

编译之后，在浏览器中打开 [http://127.0.0.1:9871](http://127.0.0.1:9871) 查看。

## TODO

- [ ] 新增项目管理模块
- [ ] 自动抓取管理的仓库代码
- [ ] 自动上传到微信小程序后台

## Reference

* [喂，快给我打一个小程序预览码](https://segmentfault.com/a/1190000015336845)

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
