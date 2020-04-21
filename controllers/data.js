const { targets } = require('../constants/enum')
const { selectors } = require('../constants/selector')
const util = require('../utils')
const axios = require('../helpers/axios')
const cheerio = require('../helpers/cheerio')
const format = require('date-format')
const { handleError } = require('../config')

module.exports = (app) => {
  app.get(
    '/api/data',
    handleError(async (req, res, next) => {
      let result = []
      for (let i = 0; i < targets.length; i++) {
        let target = targets[i]
        let each = {
          status: '',
          new: [],
          old: [],
          name: target.name,
          url: target.uri,
          date: format('dd:MM:yyyy hh:mm:ss', new Date()),
        }
        let document = await axios.fetch(target.uri)

        console.log(`crawling link ${target.uri}`)
        let selector = selectors.find((e) => e.name === target.name)
        let newData = cheerio.parse(document, selector)

        let filePath = global.appRoot + '/public/data/' + target.name + '.md'
        let oldData = util.getSavedData(filePath)
        console.log(`completed crawling ${target.uri}`)
        console.log('loading the recored file: ' + target.name + '.md')
        if (util.equal(oldData, newData)) {
          console.log('no change has been made...Skipping the following bank ' + target.name)
          each.status = 'retain'
        } else {
          console.log('new change detected, updating ' + target.name)
          each.status = 'update'
          let change = util.getChanges(oldData, newData)
          each.new = change.new
          each.old = change.old
          util.update(filePath, newData)
        }
        result.push(each)
      }
      res.status(200).json(result)
    })
  )
}
