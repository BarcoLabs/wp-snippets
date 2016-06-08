#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear and re-create the out directory
rm -rf projects/*/bundles.js || exit 0;

BUILD=$(./compile.sh)

echo 
echo "$BUILD"
echo

cd projects
git init

git config user.name "travis-ci"
git config user.email "contact@travis-ci.com"

git add ./*/bundle.js
git commit -m "Generate Webpack bundles" -m "" -m "${BUILD}"

git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages