#!/bin/bash
set -e
echo "building package"
npm run build:clean

echo "publishing to npm"
npm publish --access public
