#!/bin/bash

rm -rf ./src/static/source.zip ./src/node_modules/
zip -r source.zip src
mv source.zip ./src/static/

sudo docker stop upload-me
sudo docker rm upload-me
sudo docker build -t upload-me .

ADMIN_USERNAME=$(openssl rand -hex 16)
ADMIN_PASSWORD=$(openssl rand -hex 16)
ADMIN_SESSION=$(openssl rand -hex 16)
echo ADMIN_USERNAME=$ADMIN_USERNAME
echo ADMIN_PASSWORD=$ADMIN_PASSWORD
echo ADMIN_SESSION=$ADMIN_SESSION

sudo docker run -dp 127.0.0.1:23499:3000 --restart always --name upload-me --env ADMIN_USERNAME=$ADMIN_USERNAME --env ADMIN_PASSWORD=$ADMIN_PASSWORD --env ADMIN_SESSION=$ADMIN_SESSION upload-me
