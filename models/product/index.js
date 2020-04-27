const mongoose = require('mongoose')

var schema = mongoose.Schema

var propertySchema = new schema({
  name: { type: String, required: true },
  tag: { type: String, required: true },
  content: { type: mongoose.Mixed, required: true },
})

var productSchema = new schema({
  name: { type: String, required: true },
  tag: { type: String, required: true },
  content: { type: propertySchema, required: true },
  bank: { type: String, required: true },
})
  
var Product = mongoose.model('Product', productSchema)

module.exports.productSchema = productSchema

module.exports.Product = Product
