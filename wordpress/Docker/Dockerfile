FROM wordpress

RUN apt-get -y update && apt-get install -y vim curl mc wget unzip openssh-server mariadb-server && \
    echo "root:Docker!" | chpasswd &&  sed -i 's/#Port 22/Port 2222/g' /etc/ssh/sshd_config && sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/g' /etc/ssh/sshd_config

EXPOSE 80 443 2222