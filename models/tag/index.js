const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true, default: 1 },
})

module.exports = {
  Tag: mongoose.model('tags', tagSchema),
  TagSchema: tagSchema,
}
