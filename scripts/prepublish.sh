#!/bin/bash
RELEASE="patch" && [ -n "$1" ] && RELEASE=$1
npm test
npm version $RELEASE
npm run build:clean
git add src/config.ts

git commit --amend