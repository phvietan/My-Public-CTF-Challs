#!/bin/bash

docker build -t funny-express .

docker run -d -p 1341:1341 --rm -it funny-express
