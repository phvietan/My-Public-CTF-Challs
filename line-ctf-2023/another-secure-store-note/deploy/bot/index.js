const Redis = require('ioredis');
const redis = new Redis({
  port: 6379, // Redis port
  host: "assn-redis",
  // username: "default",
  password: process.env.REDIS_PASSWORD,
});
const { visit } = require('./pupeteer');

function validateBotUrl(url) {
  try {
    const u = new URL(url);
    return ['https:', 'http:'].includes(u.protocol);
  } catch (err) {
    return false;
  }
}

async function main() {
  while (true) {
    const [error, data] = await redis.blpop('url', 0);
    console.log(data);
    if (!validateBotUrl(data)) {
      console.log(`> Invalid url: ${data}`);
      continue;
    }
    console.log(`> Start to process - ${data}`);
    visit(data).then(() => {
      console.log(`> Done processing ${data}`);
    }).catch(err => {
      console.log(`> Error processing ${data}: ${err}`);
    });
  }
}

main();