#!/bin/bash

# Change this
PORT=3210
CHALLENGE_NAME=regular-lang-exporter

# Deploy
sudo docker stop $CHALLENGE_NAME
sudo docker build -t $CHALLENGE_NAME .
sudo docker run --name $CHALLENGE_NAME -dp 3210:80 --rm -t $CHALLENGE_NAME
