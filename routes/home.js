const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/', (res, req) => {
  Record.find({})
    .exec((err, records) => {
      if (err) return console.error(err)
      return req.render('index', { records })
    })
})

module.exports = router