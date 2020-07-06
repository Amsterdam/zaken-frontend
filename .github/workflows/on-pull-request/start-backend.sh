#!/bin/sh -l
set -e

cd ./backend

docker network create fixxx-looplijsten-backend_looplijsten_backend
docker-compose up --detach
