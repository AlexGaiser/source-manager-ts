#!/bin/bash
RELEASE="patch" && [ -n "$1" ] && RELEASE=$1
npm test
npm version $RELEASE

./build.sh -c

git add src/config.ts

git commit --amend --no-edit