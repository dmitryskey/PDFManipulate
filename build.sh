#!/bin/bash
p=./build/smartformsondemand

rm -R -f $p

mkdir -p $p
mkdir -p $p/data
mkdir -p $p/db

chmod -R 777 $p

./node_modules/.bin/tsc -p "./templates/src/USI9/tsconfig.json"
./node_modules/.bin/tsc -p "./templates/src/USI9Supplement/tsconfig.json"

./node_modules/.bin/babel templates/src --out-dir templates/lib --comments=false --minified
node managedb.js

cp -R ./pdf.js $p
cp -R ./db/database.db $p/db/fd855348-35cf-41ad-a91f-6097c4b0ccc1
rm -R -f ./iTextService/target
cp -R ./iTextService $p
cp -R ./locale $p
cp -R ./templates $p
rm -R -f $p/templates/src
cp ./wordpress/* $p

# sed -i 's/pdf.viewer.js/pdf.viewer.js?v=1/g' $p/pdf.js/web/viewer.html

tar -zcf ./build/smartformsondemand.tgz $p
# scp your_username@remotehost.edu:./build/smartformsondemand.tgz /some/local/directory
