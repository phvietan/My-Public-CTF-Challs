FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

# Install things
RUN apt update

# Enable curl for easier exploit, well who knows :(
RUN apt install -y apache2 libapache2-mod-perl2 gcc libcgi-pm-perl

WORKDIR /usr/lib/cgi-bin/

# Configs
COPY ./cgi-config/dir.conf /etc/apache2/mods-available/dir.conf
COPY ./cgi-config/serve-cgi-bin.conf /etc/apache2/conf-available/serve-cgi-bin.conf
RUN a2enmod cgid

# Source code
COPY source/*.pl /usr/lib/cgi-bin/
COPY source/content /usr/lib/cgi-bin/content/

# Permission
RUN chmod 555 ./*

# Make fake perl
COPY fake-perl.c /fake-perl.c
RUN rm -f /usr/local/bin/perl && gcc /fake-perl.c -o /usr/local/bin/perl && chmod +x /usr/local/bin/perl && rm /fake-perl.c
RUN rm /var/www/html/index.html

RUN echo "HCMUS-CTF{learn-me-plz-https://www.rexegg.com/regex-disambiguation.html}" > /FLAAAG_HERE_NO_ONNE_CAN_GUESSS_M3.wtf

CMD ["apachectl", "-D", "FOREGROUND"]
