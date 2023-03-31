FROM node:latest

WORKDIR /bot/

RUN apt update -y &&\
      apt install -y wget gnupg firefox-esr libasound2 libxtst6 && \
      useradd -ms /bin/bash bot

COPY . .
RUN chown -R bot .
USER bot
CMD npm run start