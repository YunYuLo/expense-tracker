const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const categoryList = require('../models/data/category.json').results

const Handlebars = require("handlebars")
Handlebars.registerHelper('formatTime', (date) => {
  let formatDate = date.toISOString().split("T")[0]
  return formatDate
})

router.get('/', (req, res) => {
  Record.find({})
    .exec((err, records) => {
      if (err) throw err

      let totalAmount = 0
      if (records.length > 0) {
        totalAmount = records.map(record => Number(record.amount)).reduce((a, b) => a + b)
      }

      return res.render('index', {
        records,
        categoryList,
        totalAmount
      })
    })
})

module.exports = router