#!/bin/bash
ssh -p $1 root@127.0.0.1 "mysqldump -h webapp-mysqldbserver-4b80f9a8-4184.mysql.database.azure.com -u mysqldbuser@webapp-mysqldbserver-4b80f9a8-4184 -p wordpress" | gzip --stdout > ./wordpress.gz
