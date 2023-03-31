#!/bin/bash

# This file returns the distribution folder for players to read source code
rm -rf dist
mkdir -p dist/bot/
cp deploy/bot/pupeteer.js dist/bot/

mkdir -p dist/web/
rsync -av --exclude='*.pem' --exclude='node_modules' --exclude='Dockerfile' --exclude='bot.js' deploy/web/ dist/web
