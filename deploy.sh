rm -rf .next/ docs/

yarn

prettier -w "**/*.*"

yarn build

git add .
git commit -m "Update"
git push -u origin main
