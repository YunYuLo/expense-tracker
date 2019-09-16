const express = require('express')
const app = express()

const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//mongodb
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/record', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

//mongodb
const Record = require('./models/record')

//router
app.use('/', require('./routes/home'))
app.use('/records', require('./routes/record'))
// app.use('/users', require('./routes/user'))

app.listen(3000, () => {
  console.log('App is running')
})