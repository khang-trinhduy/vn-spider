const cheerio = require('cheerio')

exports.parse = (document, selector) => {
  try {
    const $ = cheerio.load(document)
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
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}
