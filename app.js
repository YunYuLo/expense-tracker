const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('index')
})

//mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/expense', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})


app.listen(3000, () => {
  console.log('App is running')
})