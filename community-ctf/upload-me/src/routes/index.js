const express = require('express');
const router = express.Router();
const multer = require('multer');
const { runNodeJsFile } = require('../exec');

router.use((req, res, next) => {
  if (!req.locals.user) return res.redirect('/auth/login');
  next();
});
router.get('/', (req, res) => {
  res.render('index.ejs', { role: req.locals.user.role });
});
const upload = multer({
  storage: multer.diskStorage({
    filename: function (req, file, callback) {
      const mode = +req.body.mode;
      if (!mode) { // File is runnable for mode == 0
        return callback(null, 'run-code.js');
      }
      callback(null, 'code.js');
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
router.post('/', upload.single('code'), async (req, res) => {
  const { mode } = req.body;
  if (mode != req.locals.user.role) {
    return res.send({
      response: '',
      error: 'WRONGMODE_ERR: current user cannot use that mode',
    });
  }
  if (req.file?.filename.startsWith('run')) {
    const output = await runNodeJsFile(req.file.path);
    if (output === 'Hello world') {
      return res.send({
        response: 'Correct answer',
        error: '',
      });
    } else return res.send({
      response: '',
      error: 'Wrong answer',
    });
  }
  res.send({
    response: '',
    error: 'Sorry, this endpoint is restricted',
  });
});

module.exports = router;
