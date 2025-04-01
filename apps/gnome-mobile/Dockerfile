# syntax=docker/dockerfile:1

# Stage 1: Base image with Node.js
ARG NODE_VERSION=22.14.0
ARG YARN_VERSION=4.6.0
FROM node:${NODE_VERSION} AS base
WORKDIR /app

# Stage 2: Builder
FROM base AS builder
RUN corepack enable && corepack prepare yarn@${YARN_VERSION} --activate
WORKDIR /app
COPY package.json yarn.lock ./
ENV YARN_CACHE_FOLDER=/usr/local/share/.cache/yarn
RUN --mount=type=cache,target=${YARN_CACHE_FOLDER} \
    yarn install --frozen-lockfile
COPY . ./
RUN yarn build

# Stage 3: Production image
FROM node:${NODE_VERSION}-slim AS final
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]