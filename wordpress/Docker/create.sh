#/bin/bash

wwwpath=/var/www/html
wpcontentpath=$wwwpath/wp-content
pluginspath=$wpcontentpath/plugins
smartplugin=$pluginspath/smartformsondemand

# sudo docker run --name nginx-proxy --net dockerwp -p 80:80 -p 443:443 -v ~/certs:/etc/nginx/certs -v /etc/nginx/vhost.d -v /usr/share/nginx/html -v /var/run/docker.sock:/tmp/docker.sock:ro --label com.github.jrcs.letsencrypt_nginx_proxy_companion.nginx_proxy -d --restart always jwilder/nginx-proxy
# sudo docker run --name letsencrypt-nginx-proxy-companion --net dockerwp -v ~/certs:/etc/nginx/certs:rw -v /var/run/docker.sock:/var/run/docker.sock:ro --volumes-from nginx-proxy -d --restart always jrcs/letsencrypt-nginx-proxy-companion
# sudo docker run --name mariadb --net dockerwp -v mariadb:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=Spark384 -e MYSQL_DATABASE=smarti9 -e MYSQL_USER=wordpress -e MYSQL_PASSWORD=55187d7fc100164cdb944ba0f5bf3aae397dbf44ea885296 -d --restart always mariadb
# sudo docker run --name smarti9 --net dockerwp -v smarti9:/var/www/html -v ~/uploads.ini:/usr/local/etc/php/conf.d/uploads.ini -e WORDPRESS_DB_HOST=mariadb:3306 -e WORDPRESS_DB_NAME=smarti9 -e WORDPRESS_DB_USER=wordpress -e WORDPRESS_DB_PASSWORD=55187d7fc100164cdb944ba0f5bf3aae397dbf44ea885296 -e VIRTUAL_HOST=smarti9.eastus.cloudapp.azure.com -e LETSENCRYPT_HOST=smarti9.eastus.cloudapp.azure.com -e LETSENCRYPT_EMAIL=admin@smarti9.eastus.cloudapp.azure.com -d --restart always wordpress

sudo docker restart smarti9

echo "Install Smart-Forms-On-Demand plugin"
sudo docker cp ../../build/smartformsondemand.tgz smarti9:/tmp/
sudo docker exec -it smarti9 tar -xzf /tmp/smartformsondemand.tgz -C /tmp
sudo docker exec -it smarti9 cp -r /tmp/build/smartformsondemand $pluginspath
sudo docker exec -it smarti9 rm -r /tmp/build/
sudo docker exec -it smarti9 rm /tmp/smartformsondemand.tgz

sudo docker exec -it smarti9 nohup $smartplugin/startservice.sh $smartplugin
