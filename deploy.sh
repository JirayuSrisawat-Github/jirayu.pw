rm -rf .next/

pnpm install
prettier -w "**/*.*"
pnpm build

git add .
git commit -m "Update"
git push -u origin main
