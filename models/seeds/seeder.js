const mongoose = require('mongoose')
const Record = require('../record')
const recordsList = require('../data/record.json').results

mongoose.connect('mongodb://127.0.0.1/record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error')
})
db.once('open', () => {
  console.log('mongodb connected!')

  // console.log(...recordsList)
  Record.create(...recordsList)

  console.log('Record insert DB done')
})