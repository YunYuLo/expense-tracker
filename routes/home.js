const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const categoryList = require('../models/data/category.json').results
const monthList = require('../models/data/months.json').results
const { authenticated } = require('../config/auth')

const icons = {
  "home": "home",
  "traffic": "shuttle-van",
  "entertainment": "grin-beam",
  "food": "utensils",
  "other": "pen"
}

router.get('/', authenticated, (req, res) => {
  const filterMonth = req.query.filterMonth || ''
  const filterCategory = req.query.filterCategory || ''
  const filterCategoryChineseName = categoryList[filterCategory] === undefined ? '' : categoryList[filterCategory]['chineseName']


  let sql = [{
    "$project": { "m": { "$month": "$date" }, "name": 1, "category": 1, "amount": 1, "date": 1, "merchant": 1, "userId": 1 }
  }, {
    "$match": {}
  }]

  if (filterMonth === '' && filterCategory === '') {
    sql[1].$match = { userId: req.user._id }
  } else if (filterCategory === '') {
    sql[1].$match = { "m": Number(filterMonth), userId: req.user._id }
  } else if (filterMonth === '') {
    sql[1].$match = { userId: req.user._id, category: filterCategory }
  } else {
    sql[1].$match = { "m": Number(filterMonth), userId: req.user._id, category: filterCategory }
  }

  Record.aggregate(sql)
    .exec((err, records) => {
      if (err) throw err

      //show icons
      records.forEach(record => {
        record.icon = icons[record.category]
      })

      let totalAmount = 0
      if (records.length > 0) {
        totalAmount = records.map(record => Number(record.amount)).reduce((a, b) => a + b)
      }

      //create data for chart
      let subtotals = []
      let subtotalList = []
      for (record of records) {
        if (!subtotals[record.category]) {
          subtotals[record.category] = 0
          subtotals[record.category] += Number(record.amount)
        } else {
          subtotals[record.category] += Number(record.amount)
        }
      }
      for (category in categoryList) {
        (subtotals[category]) ? subtotalList.push(+subtotals[category]) : subtotalList.push(0)
      }


      return res.render('index', {
        records,
        categoryList,
        monthList,
        totalAmount,
        subtotalList,
        filterCategory,
        filterMonth,
        filterCategoryChineseName
      })
    })
})

module.exports = router