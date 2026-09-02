FROM node:20.16-alpine AS builder

WORKDIR /app

ARG BLOG_ENABLED=true
ARG DEPLOYMENT_URL="https://philippemoluh-byte.github.io"
ARG DEPLOYMENT_BRANCH="main"
ARG GITHUB_ORG="philippemoluh-byte"
ARG GITHUB_PROJECT="devscop-blog"

COPY package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force && npm install

COPY . /app

RUN npm run build

FROM nginx:latest AS runner

COPY --from=builder /app/build /usr/share/nginx/html/devscop-blog