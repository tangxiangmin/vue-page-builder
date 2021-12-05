

页面编辑器
===

## 目标

做一个完全不需要写代码的活动页面生成器

## 开发环境

整个项目使用learn + yarn workspace 搭建monorepo

编辑器, vue + ElementUI
```
npm i 

npm run dev
```

后台项目, eggjs + MySQL
```
cd server

npm i
 
// 初始化表，需要先配置好数据库连接
npx sequelize db:migrate

npm run dev
```

预览项目, vite + vue3
```
cd client

npm i 

npm run dev
```

## Feature

* [ ] 基于文档流和DOM树的移动端页面编辑器
* [ ] 适配Web，后续支持小程序和Flutter
* [ ] 支持动态数据源
* [ ] 支持交互逻辑，如点击事件等
* [ ] 常规内置组件
* [ ] 用户自定义组件库，可以上传自定义组件，可以从用户端下载
