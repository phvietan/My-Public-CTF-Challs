const ejs = require('ejs')
const express = require('express')
const captchapng = require('captchapng');
const Redis = require('ioredis');
const redis = new Redis({
  port: 6379, // Redis port
  host: "assn-redis",
  // username: "default",
  password: process.env.REDIS_PASSWORD,
});

const router = express.Router()
const { db, getCsrf } = require('./db');

function csrfCheck(req, res, next) { 
  const { csrf } = req.body
  if (csrf !== getCsrf(req.cookies.id)) return res.redirect('/bot?error=Wrong csrf')
  next()
}

const html = `
<%- include('${__dirname}' + '/views/header.ejs') %>
<body>
  <div class=content>
    <ul>
      <li><a href='/'>Home</a></li>
      <li><a class=active href=/bot>Talk to admin</a></li>
    </ul>
    <div class=main>
      <h1>📕 Secure store note 📕</h1>
      <form method=POST>
        Admin will visit your url
        <input class=change-name placeholder="http://..." type=text name=url>
        <input type=hidden name=csrf id=_csrf>
        <img id=captcha-img src=/bot/captcha.png>
        <input placeholder=Captcha id=captcha-text name=captcha>
        <input type=submit>
        <p class=red id=error></p>
        <p class=green id=message></p>
      </form>
    </div>
  </div>
  <%- include('${__dirname}' + '/views/footer.ejs') %>
</body>
`

function generateNewCaptcha(req, res, next) {
  db.users[req.user].captcha = parseInt(Math.random()*90000000+10000000);
  next();
}
  
router.get('/', generateNewCaptcha, (req, res) => {
  const response = ejs.render(html, {
    nonce: db.cookies[req.cookies.id].nonce,
  });
  res.send(response);
});

function checkSchemeUrl(url) {
  let u = undefined;
  try { u = new URL(url); } catch (err) { throw 'Wrong URL format'; }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') throw 'URL must be http or https';
  return true;
}

router.post('/', csrfCheck, async (req, res) => {
  // Don't DOS me after u got XSS
  if (req.user === process.env.ADMIN_USERNAME) return res.send('ok');
  try {
    if (req.body.captcha != db.users[req.user].captcha) throw 'Wrong captcha';
    db.users[req.user].captcha = parseInt(Math.random()*90000000+10000000);
    checkSchemeUrl(req.body.url);
  } catch (err) {
    return res.redirect(`/bot?error=${err}`)
  }
  try {
    await redis.lpush('url', req.body.url);
    res.redirect(`/bot?message=Admin is visitting your URL`);
  } catch (err) {
    console.log('Error when redis.lpush')
    console.log(err);
    console.log('============');
    res.redirect(`/bot?error=Something went wrong`);
  }
})

function randColor() { return Math.floor(Math.random() * 256) }

router.get('/captcha.png', generateNewCaptcha, (req, res) => {
  const { captcha } = db.users[req.user];
  const p = new captchapng(100, 50, captcha);
  p.color(randColor(), randColor(), randColor(), randColor());  // First color: background (red, green, blue, alpha)
  p.color(randColor(), randColor(), randColor(), randColor()); // Second color: paint (red, green, blue, alpha)
  const imgbase64 = p.getBase64();
  const img = Buffer.from(imgbase64, 'base64');
  res.setHeader('Content-Type', 'image/png');
  res.end(img);
});

module.exports = router
