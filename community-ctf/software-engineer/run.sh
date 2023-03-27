#!/bin/bash

rm -rf ./challenge/dist/ ./challenge/node_modules/ ./challenge/static/source.zip
zip -r source.zip challenge
mv source.zip ./challenge/static/

sudo docker stop software-engineer
sudo docker rm software-engineer
sudo docker build -t software-engineer .
sudo docker run -dp 127.0.0.1:5334:3000 --restart always --name software-engineer --env FLAG=$(cat ./flag.txt) --env ADMIN_PASSWORD=$(openssl rand -hex 16) software-engineer
