const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const categoryList = require('../models/data/category.json').results
const monthList = require('../models/data/months.json').results

const Handlebars = require("handlebars")
Handlebars.registerHelper('formatTime', (date) => {
  let formatDate = date.toISOString().split("T")[0]
  return formatDate
})

router.get('/', (req, res) => {
  const filterMonth = req.query.filterMonth || ''
  const filterCategory = req.query.filterCategory || ''
  const filterCategoryChineseName = categoryList[filterCategory] === undefined ? '' : categoryList[filterCategory]['chineseName']

  let sql = ''

  if (filterMonth === '' && filterCategory === '') {
    sql = [{
      "$project": { "name": 1, "category": 1, "amount": 1, "date": 1, "userId": 1 }
    }]

  } else if (filterMonth === '') {
    sql = [{
      "$project": { "name": 1, "category": 1, "amount": 1, "date": 1, "userId": 1 }
    }, {
      "$match": { category: filterCategory }
    }]

  } else if (filterCategory === '') {
    sql = [{
      "$project": { "m": { "$month": "$date" }, "name": 1, "category": 1, "amount": 1, "date": 1, "userId": 1 }
    }, {
      "$match": { "m": Number(filterMonth) }
    }]

  } else {
    sql = [{
      "$project": { "m": { "$month": "$date" }, "name": 1, "category": 1, "amount": 1, "date": 1, "userId": 1 }
    }, {
      "$match": { "m": Number(filterMonth), category: filterCategory }
    }]
  }

  Record.aggregate(sql)
    .exec((err, records) => {
      if (err) throw err

      let totalAmount = 0
      if (records.length > 0) {
        totalAmount = records.map(record => Number(record.amount)).reduce((a, b) => a + b)
      }

      return res.render('index', {
        records,
        categoryList,
        monthList,
        totalAmount,
        filterCategory,
        filterMonth,
        filterCategoryChineseName
      })
    })
})

module.exports = router