#!/bin/bash

sudo docker-compose stop
sudo rm -rf db
sudo docker-compose up -d --build
