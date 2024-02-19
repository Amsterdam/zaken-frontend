ARG NODE_VERSION=20
# Use the official Node.js image as the builder stage.
# "alpine" refers to a lightweight Linux distribution based on musl libc and BusyBox,
# known for its small size and efficiency.
FROM node:$NODE_VERSION-alpine AS builder

ARG COMMIT_HASH

ENV DIR /var/www
COPY . $DIR/

# build dirs
RUN mkdir -p $DIR/builds/acceptance
RUN mkdir -p $DIR/builds/production

WORKDIR $DIR

# install dependencies
RUN npm ci --production --unsafe-perm --ignore-scripts .

# global variables
RUN echo "REACT_APP_GIT_COMMIT_HASH=$COMMIT_HASH" > .env.local

# build production
RUN npm run build
RUN mv $DIR/build/* $DIR/builds/production/

# build acceptance
RUN npm run build:acc
RUN mv $DIR/build/* $DIR/builds/acceptance/

# Use the official Nginx image as the final stage
FROM nginx:stable-alpine

# Copy the nginx configuration
ADD nginx.conf /etc/nginx/nginx.conf

# Copy the build artifacts from the builder stage
COPY --from=builder /var/www/builds /var/www

# Start nginx
CMD nginx -g 'daemon off;'
