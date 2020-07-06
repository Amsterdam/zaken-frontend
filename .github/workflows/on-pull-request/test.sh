#!/bin/sh -l
set -e

cd "./frontend"

npm install

npm run lint
npm run test
npm run cypress:ci


