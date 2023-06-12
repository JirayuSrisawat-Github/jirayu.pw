yarn

rm -rf .angular
prettier -w "**/*.*"

yarn build
touch docs/.nojekyll
echo "jirayu.pw" > docs/CNAME

git add .
git commit -m "Update"
git push -u origin main
