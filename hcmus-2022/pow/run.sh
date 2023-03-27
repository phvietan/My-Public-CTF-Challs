#!/bin/bash

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]:-$0}"; )" &> /dev/null && pwd 2> /dev/null; )";

docker stop pow
docker build -t pow .
docker run -dp 56433:80 --rm --name pow -e FLAG=$(cat $SCRIPT_DIR/private/flag.txt) -e SECRET=$(openssl rand -hex 16) pow
