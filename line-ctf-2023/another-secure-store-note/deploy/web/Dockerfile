FROM node:latest

WORKDIR /app/

COPY . .

RUN useradd -ms /bin/bash bot && chown -R bot . && chown -R bot /usr/local/lib/node_modules/
USER bot
RUN npm i -g ioredis captchapng && npm i
ENV NODE_PATH=/usr/local/lib/node_modules
CMD npm run start
