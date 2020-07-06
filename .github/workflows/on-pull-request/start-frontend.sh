#!/bin/sh -l
set -e

npm install http-server

cd "./frontend"

npm install
npm build

cd "../"

http-server ./frontend/build -p 3001 -a localhost . &
