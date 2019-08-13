#!/bin/bash
appname=smarti9

sudo docker rmi $appname
sudo docker rmi $appname.azurecr.io/$appname
sudo docker build -t $appname .
passwd=$(az acr credential show -n $appname | python -c "import sys, json; print(json.load(sys.stdin)['passwords'][0]['value'])")
sudo docker login $appname.azurecr.io -u smarti9 -p $passwd
sudo docker tag $appname $appname.azurecr.io/$appname
sudo docker push $appname.azurecr.io/$appname
az webapp stop -n $appname -g $appname
az webapp delete -n $appname -g $appname
az appservice plan create -n $appname -g $appname --sku B1 --is-linux
az webapp create -n $appname -g $appname -p $appname -i $appname.azurecr.io/$appname
az webapp config hostname add --webapp-name $appname -g $appname --hostname 'smarti9.org'
az webapp config ssl bind --certificate-thumbprint 0EBB5CED89D08DAEAABD9D9E4C04D02BED6E69DA -n smarti9 -g smarti9 --ssl-type SNI
# az webapp remote-connection create -n smarti9 -g smarti9 -p 9000
