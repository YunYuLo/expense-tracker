const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')
const recordsList = require('../data/record.json').results
const userJson = require('../data/user.json').results


mongoose.connect('mongodb://127.0.0.1/record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error')
})
db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < userJson.length; i++) {
    //create a user
    const user = User(userJson[i])
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash
        user.save()
          .then()
          .catch(err => { console.log(err) })
      })
    })

    //create expense data
    for (let j = 0; j < recordsList.length; j++) {
      Record.create({
        ...recordsList[j],
        userId: user._id
      })
      if (j === recordsList.length) return
    }
  }

  console.log('Record and User insert DB done')
})