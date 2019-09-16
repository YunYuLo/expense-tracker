const express = require('express')
const router = express.Router()
const Record = require('../models/record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  //edit new page
})

router.get('/:id/edit', (req, res) => {
  res.render('edit')
})

router.post('/:id', (req, res) => {
  //edit record
})

router.post('/:id/delete', (req, res) => {
  //delete
})

module.exports = router