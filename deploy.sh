#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear and re-create the out directory
rm -rf projects/*/bundles.js || exit 0;

BUILD=$(./compile.sh)

cd projects
git init

git config user.name "Travis CI"
git config user.email "travis@barcolabs.com"

git add ./*/bundle.js
git commit -m "Generate Webpack bundles" -m "" -m "${BUILD}"

git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages