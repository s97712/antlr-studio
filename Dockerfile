# Stage 1: Builder
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency definition files
COPY package.json pnpm-lock.yaml ./

# Install root dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the monorepo source code
COPY . .

# Build the 'web' application
WORKDIR /app/apps/web
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Build the 'api' application
WORKDIR /app/apps/api
RUN pnpm install --frozen-lockfile
RUN pnpm build


# Stage 2: Production
FROM node:18-alpine AS production

# Install production dependencies: nginx for serving, tini for process management
RUN apk add --no-cache nginx bash openjdk17-jre

# Set working directory
WORKDIR /app

# Copy built artifacts and necessary node_modules from the builder stage
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json
COPY --from=builder /app/apps/web/dist ./apps/web/dist
COPY --from=builder /app/apps/api/resources ./apps/api/resources

# --- Nginx Configuration ---
# Remove the default nginx config to prevent conflicts
RUN rm -f /etc/nginx/conf.d/default.conf
# Copy our custom nginx configuration
COPY apps/web/nginx.conf /etc/nginx/nginx.conf

# Expose the port nginx will listen on
EXPOSE 80

# Use tini to properly manage processes and signals.
# Start nginx in the background and the API in the foreground.
# 'exec' ensures the node process correctly receives signals from tini.
CMD ["/bin/bash", "-c", "nginx -g 'daemon off;' & exec node /app/apps/api/dist/index.js"]