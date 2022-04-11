页面编辑器
===

## 我对低代码的设想

做一个非常容易扩展的活动页面编辑器。解决软件项目随时间和规模增长，维护性越来越差的问题。如果代码不需要维护，那就不存在维护性一说了吧~

* 在项目中常规的基础功能，通过基础库实现
* 定制的功能，远程组件实现，无需考虑远程组件的维护

具体流程

* 可视化配置页面，支持加载远程组件，方便动态扩展，最终输出JSON配置项
* JSON配置转换Vue SFC组件，通过id直接在线访问返回可交互HTML代码

最终目标是：希望在代码仓库中的组件可以托管在云端。

对没有前端能力的人来说，这个编辑器可以使用丰富的组件库0代码配置页面；在用户前端能力增强后，可以创建和维护组件库，依然非常方便。

## Feature

* [x] 常规内置组件
* [x] 用户自定义远程组件库
* [x] 组件文件编辑器，通过拖拽等简单的交互方式编辑组件文件
* [ ] 在线编辑Vue SFC组件文件，即时预览

## 开发环境

整个项目使用pnpm workspace 搭建monorepo，建议使用Docker Compose搭建开发环境

```
pnpm i 
```

编辑器, vite + vue3 + ElementPlus
```
npm run dev
```

后台项目, eggjs + MySQL
```
cd server

npm i
 
// 初始化表，需要先配置好数据库连接
npx sequelize db:create

npx sequelize db:migrate

npm run dev
```

预览项目, vite + vue3
```
cd preview

ts-node server.ts
```

## 相关文档

* [关于低代码平台的思考](https://www.shymean.com/article/关于低代码平台的思考)
* [使用vite加载远程模块](https://www.shymean.com/article/使用vite加载远程模块)
* [前端服务化——页面搭建工具的死与生](https://www.cnblogs.com/sskyy/p/6496287.html), 写的非常好
