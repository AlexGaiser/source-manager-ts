#!/bin/bash
clean_flag='false'
echo $clean_flag

while getopts 'c' flag; do
  case "${flag}" in
    c) clean_flag='true'
  esac
done

echo $clean_flag
if [ $clean_flag == 'true' ]; then
   rm -rf ./dist/
fi

./node_modules/typescript/bin/tsc