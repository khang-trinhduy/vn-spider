const got = require('got')

exports.get = async (uri) => {
  try {
    let response = await got(uri)
    return response.body
  } catch (error) {
    console.error(error)
  }
}
