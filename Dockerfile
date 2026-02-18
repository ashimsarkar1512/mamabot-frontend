# ----- Build Stage -----
FROM node:22-alpine AS builder

ARG NEXT_PUBLIC_API_BASE_URL
ARG SITE_ACCESS_PASSWORD

ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV SITE_ACCESS_PASSWORD=$SITE_ACCESS_PASSWORD

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ----- Production Runner Stage -----
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only the standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]