# Base image for building the monorepo
FROM node:18-alpine AS base
RUN npm install -g pnpm

# Build web app
FROM base AS web-builder
WORKDIR /app
COPY tsconfig.json package.json pnpm-lock.yaml ./
COPY apps/web ./apps/web
RUN pnpm install --filter web...
RUN pnpm --filter web run build

# Build api app
FROM base AS api-builder
WORKDIR /app
COPY tsconfig.json package.json pnpm-lock.yaml ./
COPY apps/api ./apps/api
RUN pnpm install --filter api...
RUN pnpm --filter api run build

# Production image for web
FROM nginx:stable-alpine AS web-production
COPY --from=web-builder /app/apps/web/dist /usr/share/nginx/html
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Production image for api
FROM node:18-alpine AS api-production
WORKDIR /app
RUN apk add --no-cache openjdk11
RUN npm install -g pnpm
COPY --from=api-builder /app/apps/api/dist ./dist
COPY --from=api-builder /app/apps/api/package.json .
COPY --from=api-builder /app/apps/api/resources ./resources
RUN pnpm install --prod --filter api
EXPOSE 3000
CMD ["node", "dist/index.js"]