

页面编辑器
===

## 目标

做一个完全不需要写代码的活动页面生成器

## 开发环境

整个项目使用pnpm workspace 搭建monorepo

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
npx sequelize db:migrate

npm run dev
```

预览项目, vite + vue3
```
cd preview

ts-node server.ts
```

## Feature

* [ ] 常规内置组件
* [ ] 用户自定义组件库，可以上传自定义组件，可以从用户端下载
* [ ] 在线编辑Vue SFC组件文件，即时预览
