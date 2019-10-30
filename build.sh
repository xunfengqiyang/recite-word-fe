fe_path=./dist/*
be_path=../recite-word-be/public/

npm run build

rimraf $be_path
mkdir $be_path
cp $fe_path $be_path