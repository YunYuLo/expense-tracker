const Handlebars = require('handlebars')

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
})

Handlebars.registerHelper('formatTime', (date) => {
  let formatDate = date.toISOString().split("T")[0]
  return formatDate
})

Handlebars.registerHelper('float2dollar', (value) => {
  return "NTD " + (value).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')
})
