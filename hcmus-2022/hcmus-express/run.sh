#!/bin/bash

docker stop hcmus-express
docker rm hcmus-express

rm -rf src/package-lock.json src/node_modules
rm ./src/static/source.zip
zip -r source.zip src -x "src/node_modules/*"
mv source.zip ./src/static/

docker build -t hcmus-express .
docker run -dp 41437:3000 --name hcmus-express hcmus-express
