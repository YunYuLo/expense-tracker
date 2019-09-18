const express = require('express')
const router = express.Router()
const passport = require('passport')

//facebook router
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
  })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

//google router
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

module.exports = router