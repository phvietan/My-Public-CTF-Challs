#!/bin/bash

sudo docker stop post-message
sudo docker rm post-message
sudo docker build -t post-message .
sudo docker run --restart always -dp 127.0.0.1:22410:80 --name post-message -v $PWD/src/:/var/www/html/ -t post-message
