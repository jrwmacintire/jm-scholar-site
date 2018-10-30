#!/usr/bin/env
rm -rf dist && mkdir dist
npx babel src --out-dir dist --ignore node-modules
cp src/package.json dist
cd dist && yarn install --production --modules-folder node-modules
