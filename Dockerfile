FROM node:22.13.1 AS builder

# Create build directory
WORKDIR /build

COPY . ./

# Install build dependencies
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:22.13.1-alpine as gnome-back

ENV NODE_ENV production

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/apps/gnome-back/package.json ./package.json
COPY --from=builder /build/apps/gnome-back/dist ./dist
COPY --from=builder /build/apps/gnome-back/prisma ./prisma
COPY --from=builder /build/packages/shared/dist ./node_modules/@repo/shared

EXPOSE 3000

CMD [ "yarn", "start:migrate:prod" ]

FROM node:22.13.1-alpine AS gnome-web
WORKDIR /app

ARG VITE_PUBLIC_API_URL
ARG VITE_PUBLIC_GOOGLE_WEB_CLIENT_ID

ENV NODE_ENV production
ENV SERVER_PORT=8080

RUN addgroup --system --gid 1001 vitejs
RUN adduser --system --uid 1001 vitejs

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/apps/gnome-web/package.json ./package.json
COPY --from=builder /build/apps/gnome-web/server.js ./server.js
COPY --from=builder --chown=vitejs:nodejs /build/apps/gnome-web/dist ./dist
COPY --from=builder /build/packages/shared/dist ./node_modules/@repo/shared

USER vitejs

EXPOSE 8080

CMD ["node", "server.js"]
