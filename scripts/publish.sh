
echo "building package"
npm run build
"updating package version by $1 version"
npm version $1
echo "publishing $1 version"
npm publish --access public --dryrun true