FROM node:16.13.0-alpine

WORKDIR /projects

COPY ./pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm fetch

COPY . .

RUN pnpm install -r --offline

VOLUME ["/projects/node_modules/", "/projects/packages/admin/node_modules/", "/projects/.pnpm-store/"]

CMD cd packages/admin && npm run dev
