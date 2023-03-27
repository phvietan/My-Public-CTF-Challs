#!/bin/bash

# Before production I install latest version to not have any bug (really?)
npm i express hbs --save

NODE_ENV=production node index.js
