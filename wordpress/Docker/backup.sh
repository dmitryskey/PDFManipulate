#!/bin/bash
ssh -p $1 root@127.0.0.1 "mysqldump -h smarti9.mariadb.database.azure.com -u wordpress@smarti9 -p wordpress" | gzip --stdout > ./wordpress.gz
