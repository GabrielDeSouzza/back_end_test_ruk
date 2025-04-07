FROM node:20 As development

RUN npm i -g pnpm
RUN npm add -g @nestjs/cli 

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node package.json ./

RUN pnpm install

COPY --chown=node:node . .

RUN pnpm prisma generate

USER node

FROM node:20 As build

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node package.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

ENV NODE_ENV production

RUN pnpm install --prod

RUN pnpm prisma generate

RUN pnpm build

USER node

FROM node:20 As production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/.docker ./.docker
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

RUN chmod +x ./.docker/start.sh

ENTRYPOINT ["/bin/sh", "./.docker/start.sh"]
