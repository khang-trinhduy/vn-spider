const axios = require('axios')

/**
 * Return raw data from provided url 
 * 
 * @param {string} url The target to fetch data from
 */
exports.fetch = async (url) => {
  try {
    let result = await axios.get(url)
    return result.data
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * Return result from posting a rate to target url
 * 
 * @param {string} url The target url to post data
 * @param {Object} rate The rate to post to the target url
 */
exports.push = async (url, rate) => {
    try {
        let result = await axios.post(url, rate)
        return result
    } catch (error) {
        throw new Error(error.message)
    }
}
