const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, rePassword } = req.body

  let errors = []
  if (!email || !password || !rePassword) {
    errors.push({ message: 'Email, Password, Password為必填欄位！' })
  }
  if (password !== rePassword) {
    errors.push({ message: '密碼輸入錯誤' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      rePassword
    })
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          errors.push({ message: '這個Email已經註冊過！' })
          res.render('register', {
            errors,
            name,
            email,
            password,
            rePassword
          })
        } else {
          const newUser = new User({
            name,
            email,
            password
          })

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err
              newUser.password = hash

              newUser.save()
                .then(user => {
                  res.redirect('/')
                })
                .catch(err => console.log(err))

            })
          })
        }
      })
  }


})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出')
  res.redirect('/users/login')
})

module.exports = router