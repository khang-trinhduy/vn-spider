const { Product } = require('../models/product')
const { Bank } = require('../models/bank')
const { handleError } = require('../config')
let parseProductFromBody

module.exports = (app) => {
  app.get(
    '/api/product',
    handleError(async (req, res, next) => {
      //   let banks = await Bank.find({})
      res.status(200).json({ message: 'not implemented yet' })
    })
  )
  app.post(
    '/api/product',
    handleError(async (req, res, next) => {
      let product = parseProductFromBody(req.body)
      let bank = await Bank.findOne({ name: req.body.bank })
      if (!bank) {
        res.status(500).json({ message: 'bank doesnt exist' })
        return
      }
      let result = await Product.create(product)
      res.status(200).json({ message: 'product added', content: result })
    })
  )
}

parseProductFromBody = (body) => {
  try {
    return {
      name: body.name,
      content: body.content,
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
