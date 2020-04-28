const { Tag } = require('../models/tag')
const { handleError } = require('../config')

let parseFromBody, handleSearch

module.exports = (app) => {
  app.get(
    '/api/tag',
    handleError(async (req, res, next) => {
      let tags = await Tag.find({})
      tags = handleSearch(req.query.q, tags)
      console.log(req.query)

      res.status(200).json(tags)
    })
  )
  app.get(
    '/api/tag/:id',
    handleError(async (req, res, next) => {
      const id = req.params.id
      const tag = await Tag.findById(id)
      res.status(200).json(tag || { message: 'not found' })
    })
  )
  app.post(
    '/api/tag',
    handleError(async (req, res, next) => {
      const tag = parseFromBody(req.body)
      const result = await Tag.create(tag)
      res.status(201).json(result)
    })
  )
  app.put(
    '/api/tag/:id',
    handleError(async (req, res, next) => {
      const id = req.params.id
      const tag = parseFromBody(req.body)
      const result = await Tag.findByIdAndUpdate(id, tag)
      res.status(200).json({ message: `updated ${result._id}` })
    })
  )
  app.delete(
    '/api/tag/:id',
    handleError(async (req, res, next) => {
      const id = req.params.id
      const result = await Tag.findByIdAndDelete(id)
      res.status(204).json(result)
    })
  )
}

parseFromBody = (body) => {
  return {
    name: body.name,
    count: body.count,
  }
}

handleSearch = (query, array) => {
  if (!query) {
    return array
  }
  const regex = new RegExp(query, 'gi')
  array = array.filter((e) => e.name.match(regex))
  return array
}
