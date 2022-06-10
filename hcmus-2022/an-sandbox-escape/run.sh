#!/bin/bash

sudo docker stop an-sandbox-escape
sudo docker build -t an-sandbox-escape .
sudo docker run --name an-sandbox-escape -dp 6900:6900 --rm -it an-sandbox-escape
