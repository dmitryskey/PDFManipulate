#!/bin/bash

scp ./build/smartformsondemand.tgz dmitryskey@smarti9.eastus.cloudapp.azure.com:/home/dmitryskey/smartformsondemand.tgz
#ssh dmitryskey@smarti9.eastus.cloudapp.azure.com 'sudo docker exec smarti9 "/var/www/html/wp-content/plugins/smartformsondemand/startservice.sh /var/www/html/wp-content/plugins/smartformsondemand"'
