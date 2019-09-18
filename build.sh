#!/bin/bash
p=./build/smartformsondemand
iTextService=./backgroundService/iTextService

rm -R -f $p && mkdir -p $p && mkdir -p $p/data && mkdir -p $p/db && chmod -R 777 $p

cd ./pdf.js && git pull && git checkout PDFManipulate && npm install && npm audit fix && gulp minified && cd ..
cp -R ./pdf.js/build/minified $p/pdf.js
find $p/pdf.js -name *.js.map -type f -delete && find $p/pdf.js -name *.pdf -type f -delete

./node_modules/.bin/tsc -p "./templates/src/USI9/tsconfig.json"

if [[ $? != 0 ]]; then exit $rc; fi

./node_modules/.bin/tsc -p "./templates/src/USI9Supplement/tsconfig.json"

if [[ $? != 0 ]]; then exit $?; fi

./node_modules/.bin/babel templates/src --out-dir templates/lib --comments=false --minified

if [[ $? != 0 ]]; then exit $?; fi

cp -R ./db/database.db $p/db/fd855348-35cf-41ad-a91f-6097c4b0ccc1
dotnet publish $iTextService/iTextService.csproj --self-contained -r linux-x64 -o ./build/iTextService/linux-x64 -c Release

if [[ $? != 0 ]]; then exit $?; fi

mv $iTextService/build/iTextService $p && cp -R ./locale $p && cp -R ./templates $p && rm -R -f $p/templates/src
cp ./wordpress/s* $p && tar -zcf $p.tgz $p 

