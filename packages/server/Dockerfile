FROM node:16.13.0-alpine

WORKDIR /projects

COPY ./pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm fetch

COPY . .

RUN pnpm install -r --offline

VOLUME ["/projects/node_modules/", "/projects/packages/server/node_modules/", "/projects/.pnpm-store/"]

# todo 初始化数据库的脚本应该需要单独处理
CMD cd packages/server
    && npx sequelize db:create \
    && npx sequelize db:migrate \
    && npm run dev
