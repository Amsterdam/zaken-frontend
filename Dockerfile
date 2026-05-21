ARG NODE_VERSION=22

FROM node:$NODE_VERSION-alpine AS builder

ARG COMMIT_HASH

ENV DIR=/var/www
WORKDIR $DIR

COPY package.json package-lock.json ./

RUN npm ci --production --unsafe-perm --ignore-scripts

COPY . .

RUN mkdir -p $DIR/builds/application

RUN find src -type f -name "*.stories.tsx" -delete

RUN npm run build

RUN mv $DIR/build/* $DIR/builds/application/

FROM nginx:stable-alpine

ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /var/www/builds /var/www
COPY --from=builder /var/www/env.* /var/www
COPY --from=builder /var/www/package.json /var/www/package.json

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]