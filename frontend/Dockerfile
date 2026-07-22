FROM ghcr.io/pnpm/pnpm:11 AS builder
RUN pnpm runtime set node 24 -g

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build
RUN pnpm store prune

FROM nginx:stable-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN sed -i 's/#gzip on/gzip on/' /etc/nginx/nginx.conf
