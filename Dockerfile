ARG NODE_VERSION=22
# Use the official Node.js image as the builder stage.
# "alpine" refers to a lightweight Linux distribution based on musl libc and BusyBox,
# known for its small size and efficiency.
FROM node:$NODE_VERSION-alpine AS builder

ARG COMMIT_HASH

ENV DIR=/var/www

# build dirs
RUN mkdir -p $DIR/builds/application

WORKDIR $DIR

# Copy package files first for better layer caching:
# Docker only re-runs npm ci when package*.json changes, not on every code change.
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copy the rest of the source code
COPY . .

# global variables
# RUN echo "REACT_APP_GIT_COMMIT_HASH=$COMMIT_HASH" > .env.local

# remove storybook files
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

ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["nginx", "-g", "daemon off;"]
