const { productSchema } = require('../product')
const mongoose = require('mongoose')

var schema = mongoose.Schema

var bankSchema = new schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  link: { type: String, required: false },
  lastUpdated: { type: Date, required: false, default: new Date() },
  products: [{ type: productSchema }],
})

var Bank = mongoose.model('Bank', bankSchema)

module.exports.Bank = Bank
