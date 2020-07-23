FROM node:12 AS builder

ARG COMMIT_HASH

ENV DIR /var/www
COPY . $DIR/
RUN ls -la $DIR

# build dirs
RUN mkdir -p $DIR/builds/acceptance
RUN mkdir -p $DIR/builds/production

WORKDIR $DIR

# install dependencies
RUN npm ci --unsafe-perm .

# global variables
RUN echo "REACT_APP_GIT_COMMIT_HASH=$COMMIT_HASH" > .env.local

# build production
RUN npm run build
RUN mv $DIR/build/* $DIR/builds/production/

# build acceptance
RUN cat .env.acceptance > .env.production.local
RUN npm run build
RUN mv $DIR/build/* $DIR/builds/acceptance/

RUN ls -la $DIR/builds

FROM nginx:stable-alpine
ADD nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /var/www/builds /var/www
RUN ls -la /var/www/builds
CMD nginx -g 'daemon off;'
