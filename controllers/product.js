const { Product } = require('../models/product')
const { Bank } = require('../models/bank')
const { handleError } = require('../config')
let parseProductFromBody

module.exports = (app) => {
  app.get(
    '/api/product',
    handleError(async (req, res, next) => {
      let products = await list()
      res.status(200).json(products)
    })
  )
  app.post(
    '/api/product',
    handleError(async (req, res, next) => {
      let product = parseProductFromBody(req.body)
      let bank = await Bank.findOne({ code: req.body.bank })
      if (!bank) {
        res.status(500).json({ message: 'bank doesnt exist' })
        return
      }
      if (!bank.products) {
        bank.products = []
      }
      bank.products.push(product)
      let result = await bank.save()
      res.status(200).json({ message: 'product added', content: result })
    })
  )
  app.delete(
    '/api/bank/:bid/product/:pid',
    handleError(async (req, res, next) => {
      let bank = await Bank.findById(req.params.bid)
      let index = bank.products.indexOf((p) => p._id === req.params.pid)
      bank.products.splice(index, 1)

      let result = await bank.save()
      res.status(204).json(result)
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

list = async () => {
  let results = await Bank.aggregate([
    {
      $unwind: '$products',
    },
    {
      $group: {
        _id: null,
        products: { $push: '$products' },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ])
  results = results[0].products
  return results
}
