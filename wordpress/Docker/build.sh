#!/bin/bash
cp -f ../../build/smartformsondemand.tgz smartformsondemand.tgz
sudo docker stop smarti9 && sudo docker rm smarti9 && sudo docker rmi smarti9
sudo docker build -t smarti9 .
sudo docker run --name smarti9 --net dockerwp -v smarti9:/var/www/html -v ~/uploads.ini:/usr/local/etc/php/conf.d/uploads.ini -e WORDPRESS_DB_HOST=mariadb:3306 -e WORDPRESS_DB_NAME=smarti9 -e WORDPRESS_DB_USER=wordpress -e WORDPRESS_DB_PASSWORD=55187d7fc100164cdb944ba0f5bf3aae397dbf44ea885296 -e VIRTUAL_HOST=smarti9.eastus.cloudapp.azure.com -e LETSENCRYPT_HOST=smarti9.eastus.cloudapp.azure.com -e LETSENCRYPT_EMAIL=admin@smarti9.eastus.cloudapp.azure.com -d --restart always wordpress
rm smartformsondemand.tgz
