const Handlebars = require('handlebars')

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
})

Handlebars.registerHelper('formatTime', (date) => {
  let formatDate = date.toISOString().split("T")[0]
  return formatDate
})
