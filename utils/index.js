const fs = require('fs')
const rates = require('../constants/rates')

/**
 * Return true if a === b otherwise false
 *
 * @param {object} obj1 The first object to compare
 * @param {object} obj2 The second object to compare again
 * @returns {boolean} The result of the comparation
 */
exports.equal = (obj1, obj2) => {
  let str1 = JSON.stringify(obj1)
  let str2 = JSON.stringify(obj2)
  return str1 === str2
}

/**
 * Update the file with latest update
 *
 * @param {string} filePath The path to the file need to update
 * @param {object} data The object to udpate from
 *
 */
exports.update = async (filePath, data) => {
  try {
    let file = await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2))
    return file
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * Return the different between 2 data depend on rates type(helpers)
 *
 * @param {Object} oldData The old data
 * @param {Object} newData The new data
 */
exports.getChanges = (oldData, newData) => {
  try {
    let result = { old: [], new: [] }
    let rateTypes = rates.types
    rateTypes.forEach((type) => {
      if (oldData[type] && newData[type]) {
        if (oldData[type] !== newData[type]) {
          result.old.push({ type: type, data: oldData[type] })
          result.new.push({ type: type, data: newData[type] })
        }
      }
    })
    return result
  } catch (error) {
    throw new Error(error.message)
  }
}

/**
 * Return the saved data from a file
 *
 * @param {string} filePath The path to the file to read
 *
 */
exports.getSavedData = async (filePath) => {
  try {
    let data = await fs.promises.readFile(filePath)
    return JSON.parse(data)
  } catch (error) {
    throw new Error(error.message)
  }
}
