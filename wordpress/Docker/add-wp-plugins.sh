#!/bin/bash

pluginurl=https://downloads.wordpress.org/plugin
wwwpath=/var/www/html
wpcontentpath=$wwwpath/wp-content
pluginspath=$wpcontentpath/plugins
smartplugin=$pluginspath/smartformsondemand
themespath=$wpcontentpath/themes
tmppluginzip=/tmp/wpplugin.zip

echo "Downloading and installing WordPress plugins"
wget -qO- $pluginurl/polylang.2.6.8.zip -O $tmppluginzip && unzip -q $tmppluginzip -d $pluginspath && rm $tmppluginzip
wget -qO- $pluginurl/svg-support.2.3.15.zip -O $tmppluginzip && unzip -q $tmppluginzip -d $pluginspath && rm $tmppluginzip
wget -qO- $pluginurl/contact-form-7.5.1.6.zip -O $tmppluginzip && unzip -q $tmppluginzip -d $pluginspath && rm $tmppluginzip
wget -qO- $pluginurl/wp-mail-smtp.1.8.1.zip -O $tmppluginzip && unzip -q $tmppluginzip -d $pluginspath && rm $tmppluginzip
wget -qO- https://downloads.wordpress.org/theme/startup-blog.1.32.zip -O $tmppluginzip && unzip -q $tmppluginzip -d $themespath && rm $tmppluginzip

rm -r $themespath/twenty* && rm -r $pluginspath/akismet && rm $pluginspath/hello.php

echo "Installing Smart-Forms-On-Demand plugin"
tar -xzf /tmp/smartformsondemand.tgz -C /tmp && mv /tmp/build/smartformsondemand $pluginspath && rmdir /tmp/build && rm /tmp/smartformsondemand.tgz

chown -R www-data:www-data $pluginspath/*
chown -R www-data:www-data $themespath/*

mv /tmp/wp-config.php $wwwpath

echo "Create links"
ln -s $smartplugin/data $wwwpath/data
ln -s $smartplugin/templates/forms/en-US/US\ I9.pdf $wwwpath/data/US\ I9_en-US.pdf
ln -s $smartplugin/templates/forms/es-MX/US\ I9.pdf $wwwpath/data/US\ I9_es-MX.pdf
ln -s $smartplugin/templates/forms/en-US/US\ I9\ Supplement.pdf $wwwpath/data/US\ I9\ Supplement_en-US.pdf
ln -s $smartplugin/templates/forms/es-MX/US\ I9\ Supplement.pdf $wwwpath/data/US\ I9\ Supplement_es-MX.pdf
ln -s $smartplugin/locale $wwwpath/locale
ln -s $smartplugin/pdf.js $wwwpath/pdf.js
ln -s $smartplugin/templates/lib $wwwpath/templates

echo "Copy logo"
mkdir $wpcontentpath/uploads && mkdir $wpcontentpath/uploads/2018 && mkdir $wpcontentpath/uploads/2018/10 && mv /tmp/Smart-Forms-On-Demand.svg $wpcontentpath/uploads/2018/10

sed -i '$ a Redirect /wp-content/plugins/smartformsondemand/iTextService /index.php' $wwwpath/.htaccess
sed -i '$ a Redirect /wp-content/plugins/smartformsondemand/db /index.php' $wwwpath/.htaccess
sed -i '$ a Redirect /wp-content/plugins/smartformsondemand/templates/forms /index.php' $wwwpath/.htaccess

service ssh start
nohup $smartplugin/startservice.sh $smartplugin
