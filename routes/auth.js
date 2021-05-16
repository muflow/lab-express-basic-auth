const express = require('express');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const router = express.Router();

const User = require('../models/User.model');

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;
  bcryptjs
    .genSalt(saltRounds)
    .then(salt => {
      console.log('salt', salt);
      return bcryptjs.hash(password, salt);
    })
    .then(hashedPassword => User.create({ username, email, passwordHash: hashedPassword }))
    .then(() => {
      res.redirect('/');
    })
    .catch(error => next(error));
});



module.exports = router;