FROM wordpress:latest

# ssh
ENV SSH_PASSWD "root:Docker!"
ENV SSH_CONFIG "/etc/ssh/sshd_config"
RUN apt-get update \
        && apt-get install -y --no-install-recommends dialog \
        && apt-get update \
        && apt-get install -y --no-install-recommends openssh-server mc vim wget unzip mariadb-client \
        && echo "$SSH_PASSWD" | chpasswd \
        && sed -i 's/#Port 22/Port 2222/g' "$SSH_CONFIG" \
        && sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/g' "$SSH_CONFIG" \
        && sed -i 's/exec "$@"/add-wp-plugins.sh\nexec "$@"/g' /usr/local/bin/docker-entrypoint.sh \
        && sed -i "s/function is_ssl() {/function is_ssl() {\n\t\$\_SERVER['HTTPS'] = 'on';/g" /usr/src/wordpress/wp-includes/load.php

EXPOSE 80 443 2222

COPY add-wp-plugins.sh /usr/local/bin
COPY ../../build/smartformsondemand.tgz /tmp
COPY Smart-Forms-On-Demand.svg /tmp
COPY wp-config.php /tmp

EXPOSE 80 443 2222
