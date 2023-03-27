#!/bin/bash

# Change this
CHALLENGE_NAME=regular-lang-exporter

# Deploy
sudo docker stop $CHALLENGE_NAME
sudo docker build -t $CHALLENGE_NAME .
sudo docker run --name $CHALLENGE_NAME -dp 127.0.0.1:34444:80 --restart always -t $CHALLENGE_NAME
