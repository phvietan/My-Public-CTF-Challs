#!/bin/bash

sudo docker stop algo-lover

sudo docker build -t algo-lover .

sudo docker run -d -p 2336:2336 --rm --name algo-lover -t algo-lover
