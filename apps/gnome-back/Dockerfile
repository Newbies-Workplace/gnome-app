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
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=builder --chown=nestjs:nodejs /app/ .

EXPOSE 3000

CMD [ "yarn", "workspace", "gnome-back", "start:migrate:prod" ]
