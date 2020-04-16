const cheerio = require('cheerio')
const htmlSrv = require('../services/html')
const banks = require('../constants/enum')
const { selectors } = require('../constants/selector')
const axios = require('axios')
const util = require('../utils')
const fs = require('fs')

exports.list = async (req, res, next) => {
  try {
    let target = banks.targets[1]
    let response = await axios.get(target.uri)
    console.log(`crawling link ${target.uri}`)

    const $ = cheerio.load(response.data)
    let selector = selectors.find((e) => e.name === target.name)
    let result = {
      ul: $(selector.ul).text().trim(),
      one: $(selector.one).text().trim(),
      two: $(selector.two).text().trim(),
      three: $(selector.three).text().trim(),
      six: $(selector.six).text().trim(),
      nine: $(selector.nine).text().trim(),
      twelve: $(selector.twelve).text().trim(),
      tfour: $(selector.tfour).text().trim(),
      tsix: $(selector.tsix).text().trim(),
      feight: $(selector.feight).text().trim(),
      sixty: $(selector.sixty).text().trim(),
    }
    console.log(`completed crawling ${target.uri}`)
    console.log('loading the recored file: ' + target.name + '.md')
    // read a file with readFileSync to block the code below from executing
    let data = await fs.promises.readFile(global.appRoot + '/public/data/' + target.name + '.md')
    let recorded = JSON.parse(data)
    if (!util.equal(recorded, result)) {
      
    }
    console.log(typeof result);
    console.log(typeof recorded);
    
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}
