const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('./handlebars-helper')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

//mongodb
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/record', { useNewUrlParser: true, useUnifiedTopology: true })

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
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running')
})