# Use the official Node.js image as the builder stage
FROM node:16-alpine AS builder

ARG COMMIT_HASH

ENV DIR /var/www
COPY . $DIR/

# build dirs
RUN mkdir -p $DIR/builds/acceptance
RUN mkdir -p $DIR/builds/production

WORKDIR $DIR

# Install ca-certificates to handle SSL certificate verification
RUN apk add --no-cache ca-certificates

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

# Install libx11 for Nginx (if needed)
RUN apk update && apk add --no-cache libx11

# Copy the nginx configuration
ADD nginx.conf /etc/nginx/nginx.conf

# Copy the build artifacts from the builder stage
COPY --from=builder /var/www/builds /var/www

# Start nginx
CMD nginx -g 'daemon off;'
