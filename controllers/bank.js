const { Bank } = require('../models/bank')
const { handleError } = require('../config')

module.exports = (app) => {
  app.get(
    '/api/bank',
    handleError(async (req, res, next) => {
      const banks = await Bank.find({})
      res.status(200).json({items: banks, total_count: banks.length})
    })
  )
  app.get(
    '/api/bank/:id',
    handleError(async (req, res, next) => {
      const id = req.params.id
      let bank = await Bank.findById(id)
      res.status(200).json(bank)
    })
  )
  app.post(
    '/api/bank',
    handleError(async (req, res, next) => {
      const exist = await Bank.findOne({ code: req.body.code })
      if (!exist) {
        const bank = parseFromBody(req.body)
        const result = await Bank.create(bank)
        res.status(201).json(result)
      } else {
        res.status(400).json({ error: 'duplicate' })
      }
    })
  )
  app.delete(
    '/api/bank/:id',
    handleError(async (req, res, next) => {
      const bank = await Bank.deleteOne({ _id: req.params.id })
      res.status(204).json(bank)
    })
  )
  app.put(
    '/api/bank/:id',
    handleError(async (req, res, next) => {
      const id = req.params.id
      const bank = parseFromBody(req.body)
      bank.lastUpdated = new Date()
      const result = await Bank.findByIdAndUpdate(id, bank)
      res.status(200).json(result)
    })
  )
}

function parseFromBody(body) {
  return {
    name: body.name,
    code: body.code,
    products: body.products,
  }
}
