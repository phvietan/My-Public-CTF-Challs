#!/bin/bash
su -c 'cd /bot && bash /bot/start.sh' bot
apachectl -D FOREGROUND
