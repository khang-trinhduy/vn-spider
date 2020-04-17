const mongoose = require('mongoose')

var schema = mongoose.Schema

var productSchema = new schema({
  name: { type: String, required: true },
  content: { type: propertySchema, required: true },
})

var propertySchema = new schema({
  name: { type: String, required: true },
  content: { type: mongoose.Mixed, required: true },
})

var Product = mongoose.model('Product', productSchema)

module.exports.Product = Product
