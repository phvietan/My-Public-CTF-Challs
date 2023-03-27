const express = require('express');
const { MyUsers } = require('../users');
const router = express.Router();

router.use((req, res, next) => {
  if (req.locals.user) return res.redirect('/');
  next();
});
router.get('/login', (req, res) => {
  res.render('auth.ejs', { title: 'Login', err: '' });
});
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  try { 
    const id = MyUsers.login(username, password);
    res.cookie('id', id);
    res.redirect('/');
  } catch (err) {
    res.render('auth.ejs', { title: 'Login', err });
  }
});
router.get('/signup', (req, res) => {
  res.render('auth.ejs', { title: 'Signup', err: '' });
});
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  try { 
    MyUsers.register(username, password);
    const id = MyUsers.login(username, password);
    res.cookie('id', id);
    res.redirect('/');
  } catch (err) {
    res.render('auth.ejs', { title: 'Signup', err });
  }
});

module.exports = router;