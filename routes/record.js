const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')


router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

router.post('/', authenticated, (req, res) => {
  const { name, date, merchant, category, amount } = req.body

  let errors = []
  if (!name || !date || !category || !amount) {
    errors.push({ message: '＊欄位為必填欄位！' })
  }
  if (isNaN(amount)) {
    errors.push({ message: `金額必須是數字` })
  }

  if (errors.length > 0) {
    res.render('new', {
      errors,
      name,
      date,
      merchant,
      category,
      amount
    })
  } else {
    const record = new Record({
      name,
      date,
      merchant,
      category,
      amount,
      userId: req.user._id
    })

    record.save((err) => {
      if (err) throw err
      return res.redirect('/')
    })
  }
})

router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, records) => {
    if (err) throw err
    const formatDate = records.date.toISOString().split("T")[0]
    return res.render('edit', {
      records,
      formatDate
    })
  })
})

router.put('/:id', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, records) => {
    if (err) throw err

    let errors = []
    const { name, date, merchant, category, amount } = req.body
    if (!name || !date || !category || !amount) {
      errors.push({ message: '＊欄位皆為必填欄位！' })
    }
    if (isNaN(amount)) {
      errors.push({ message: `金額必須是數字` })
    }

    if (errors.length > 0) {
      const formatDate = records.date.toISOString().split("T")[0]
      return res.render('edit', {
        errors,
        records,
        formatDate
      })
    } else {
      records.name = req.body.name
      records.date = req.body.date
      records.merchant = req.body.merchant
      records.category = req.body.category
      records.amount = req.body.amount

      records.save((err) => {
        return res.redirect('/')
      })
    }
  })
})

router.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, records) => {
    records.remove((err) => {
      if (err) throw err
      return res.redirect('/')
    })
  })
})

module.exports = router