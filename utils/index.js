const fs = require('fs')

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
 * @param {object} obj The object to udpate from
 *
 */
exports.update = async (filePath, obj) => {
  try {
    let file = await fs.promises.readFile(filePath, { encoding: 'utf8', flag: 'rw' })
    let recored = JSON.parse(file)

  } catch (error) {
    throw new Error(error)
  }
}
