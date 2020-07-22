FROM node:12 AS builder

ARG COMMIT_HASH

ENV DIR /var/www
WORKDIR $DIR

COPY . $DIR

RUN npm ci --unsafe-perm .
RUN echo "REACT_APP_GIT_COMMIT_HASH=$COMMIT_HASH" > .env.production.local
RUN npm run build

FROM nginx:stable-alpine
ADD nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /var/www/build /var/www
CMD nginx -g 'daemon off;'
