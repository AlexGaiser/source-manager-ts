#!/bin/bash
RELEASE="patch" && [ -n "$1" ] && RELEASE=$1
npm test
npm version $RELEASE