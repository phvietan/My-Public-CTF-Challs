#!/bin/bash

cd chall
zip -r source.zip docker* nginx index.php

sudo docker-compose down
sudo docker-compose up --build -d
