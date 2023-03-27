const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { MyUsers } = require('./users');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')))

app.use((req, res, next) => {
  req.locals = {};
  const { id } = req.cookies;
  req.locals.user = MyUsers.getUser(id);
  next();
});

app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/index'));

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
