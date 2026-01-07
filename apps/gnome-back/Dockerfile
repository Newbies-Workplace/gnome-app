FROM node:20-alpine AS base

WORKDIR /app

FROM base AS prepare

RUN yarn global add turbo@^2.3.3
COPY . .

RUN turbo prune gnome-back --docker

FROM base AS builder

COPY --from=prepare /app/out/json/ .
RUN yarn install

# Build the project
COPY --from=prepare /app/out/full/ .

RUN yarn turbo build

FROM base AS gnome-back

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=builder --chown=nestjs:nodejs /app/apps/gnome-back/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/gnome-back/package.json ./
COPY --from=builder --chown=nestjs:nodejs /app/apps/gnome-back/assets ./assets
COPY --from=builder --chown=nestjs:nodejs /app/apps/gnome-back/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/gnome-back/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/apps/gnome-back/prisma.config.ts ./

EXPOSE 3000

CMD [ "npm", "run", "start:migrate:prod" ]

# todo https://turborepo.com/docs/guides/tools/docker
