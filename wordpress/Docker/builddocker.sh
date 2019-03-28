#!/bin/bash

pluginurl=https://downloads.wordpress.org/plugin
wpcontentpath=/var/www/html/wp-content
pluginspath=$wpcontentpath/plugins
themespath=$wpcontentpath/themes

dockerexec="sudo docker exec -it smarti9"

sudo docker build -t smarti9 . 
sudo docker create -p 2222:2222 -p 80:80 -p 443:443 --name smarti9 smarti9

sudo docker start smarti9
$dockerexec wget $pluginurl/polylang.2.5.2.zip -O /tmp/polylang.zip
$dockerexec wget $pluginurl/svg-support.2.3.15.zip -O /tmp/svgsupport.zip
$dockerexec wget $pluginurl/wp-social-sharing.2.2.zip -O /tmp/wpsocialsharing.zip
$dockerexec wget https://downloads.wordpress.org/theme/startup-blog.1.31.zip -O /tmp/startupblog.zip
sudo docker cp ./smartformsondemand.tgz smarti9:/tmp/
sudo docker cp ./wp-config.php smarti9:/var/www/html
$dockerexec tar -xzvf /tmp/smartformsondemand.tgz -C /tmp
$dockerexec mv /tmp/build/smartformsondemand $pluginspath
$dockerexec ln -s $pluginspath/smartformsondemand/data /var/www/html/data
$dockerexec ln -s $pluginspath/smartformsondemand/templates/forms/en-US/US\ I9.pdf /var/www/html/data/US\ I9_en-US.pdf
$dockerexec ln -s $pluginspath/smartformsondemand/templates/forms/es-MX/US\ I9.pdf /var/www/html/data/US\ I9_es-MX.pdf
$dockerexec ln -s $pluginspath/smartformsondemand/templates/forms/en-US/US\ I9\ Supplement.pdf /var/www/html/data/US\ I9\ Supplement_en-US.pdf
$dockerexec ln -s $pluginspath/smartformsondemand/templates/forms/es-MX/US\ I9\ Supplement.pdf /var/www/html/data/US\ I9\ Supplement_es-MX.pdf
$dockerexec ln -s $pluginspath/smartformsondemand/locale /var/www/html/locale
$dockerexec ln -s $pluginspath/smartformsondemand/pdf.js /var/www/html/pdf.js
$dockerexec ln -s $pluginspath/smartformsondemand/templates/lib /var/www/html/templates
$dockerexec unzip /tmp/polylang.zip -d $pluginspath
$dockerexec unzip /tmp/svgsupport.zip -d $pluginspath
$dockerexec unzip /tmp/wpsocialsharing.zip -d $pluginspath
$dockerexec unzip /tmp/startupblog.zip -d $themespath
$dockerexec rm /tmp/smartformsondemand.tgz
$dockerexec rmdir /tmp/build
$dockerexec rm /tmp/polylang.zip
$dockerexec rm /tmp/svgsupport.zip
$dockerexec rm /tmp/wpsocialsharing.zip
$dockerexec rm /tmp/startupblog.zip
$dockerexec rm -r $themespath/twenty*
$dockerexec rm -r $pluginspath/akismet
$dockerexec rm $pluginspath/hello.php

$dockerexec service ssh start

$dockerexec mv /var/lib/mysql /var/www/html/wp-content/plugins/smartformsondemand/db
$dockerexec ln -s /var/www/html/wp-content/plugins/smartformsondemand/db/mysql /var/lib/mysql
$dockerexec service mysql start

$dockerexec mysql -u root -e \
"CREATE DATABASE wordpress DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci; GRANT ALL ON wordpress.* TO 'wordpress'@'localhost' IDENTIFIED BY '55187d7fc100164cdb944ba0f5bf3aae397dbf44ea885296';FLUSH PRIVILEGES;"

$dockerexec nohup $pluginspath/smartformsondemand/startservice.sh $pluginspath/smartformsondemand
