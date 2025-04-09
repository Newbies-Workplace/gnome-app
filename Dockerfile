FROM node:22.13.1 AS builder

# Create build directory
WORKDIR /build

COPY . ./

# Install build dependencies
RUN yarn install
RUN yarn build

FROM node:22.13.1-alpine as gnome-back

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/apps/gnome-back/package.json ./package.json
COPY --from=builder /build/apps/gnome-back/.nest ./.nest
COPY --from=builder /build/apps/gnome-back/prisma ./prisma
COPY --from=builder /build/packages/shared/.dist ./node_modules/shared

EXPOSE 3000

CMD [ "yarn", "start:migrate:prod" ]

FROM node:22.13.1-alpine AS gnome-web
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 vitejs
RUN adduser --system --uid 1001 vitejs

COPY --from=builder --chown=vitejs:nodejs /build/apps/gnome-web/.next ./.next
COPY --from=builder /build/apps/gnome-web/next.config.js ./
COPY --from=builder /build/apps/gnome-web/package.json ./package.json
COPY --from=builder /build/node_modules ./node_modules

USER vitejs

EXPOSE 5173

CMD ["yarn", "start"]
