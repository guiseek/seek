#!/bin/bash

npm run format:write
npm run format:check

npm run lint

npm run affected:lint -- --exclude=util-encoder --base=origin/main
npm run affected:test -- --base=origin/main
npm run affected:build -- --base=origin/main
