FROM node:12 AS builder

ARG COMMIT_HASH

ENV DIR /var/www

# build dirs
RUN mkdir $DIR/builds
RUN mkdir $DIR/builds/acceptance
RUN mkdir $DIR/builds/production

# install dependencies
RUN npm ci --unsafe-perm .
RUN echo "REACT_APP_GIT_COMMIT_HASH=$COMMIT_HASH" > .env.production.local

# build acceptance
RUN npm run build:acc
RUN mv $DIR/build/* $DIR/builds/acceptance/

# build production
RUN npm run build
RUN mv $DIR/build/* $DIR/builds/production/

FROM nginx:stable-alpine
ADD nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /var/www/build /var/www
CMD nginx -g 'daemon off;'
