#!/bin/bash
p=./build/smartformsondemand
iTextService=./backgroundService/iTextService

rm -R -f $p

mkdir -p $p
mkdir -p $p/data
mkdir -p $p/db

chmod -R 777 $p

./node_modules/.bin/tsc -p "./templates/src/USI9/tsconfig.json"
./node_modules/.bin/tsc -p "./templates/src/USI9Supplement/tsconfig.json"

./node_modules/.bin/babel templates/src --out-dir templates/lib --comments=false --minified
# node managedb.js

cp -R ./pdf.js $p
cp -R ./db/database.db $p/db/fd855348-35cf-41ad-a91f-6097c4b0ccc1
dotnet publish $iTextService/iTextService.csproj --self-contained -r linux-x64 -o ./build/iTextService/linux-x64
mv $iTextService/build/iTextService $p
cp -R ./locale $p
cp -R ./templates $p
rm -R -f $p/templates/src
cp ./wordpress/* $p

# sed -i 's/pdf.viewer.js/pdf.viewer.js?v=1/g' $p/pdf.js/web/viewer.html

tar -zcf ./build/smartformsondemand.tgz $p
scp ./build/smartformsondemand.tgz dmitryskey@smarti9.eastus.cloudapp.azure.com:/home/dmitryskey/smartformsondemand.tgz
