# ---- Stage 1: Build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# ---- Stage 2: Serve ----
FROM nginx:alpine

ARG BASE_URL
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Inyecta BASE_URL en env.js durante el build
RUN if [ -n "$BASE_URL" ]; then \
  sed -i "s|window.__env.baseUrl = '.*'|window.__env.baseUrl = '$BASE_URL'|g" \
  /usr/share/nginx/html/assets/env.js; \
fi

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
