const fs = require('fs')

module.exports = (app) => {
  fs.readdirSync(global.appRoot + '/controllers').forEach((file) => {
    require(`../controllers/${file.substr(0, file.indexOf('.'))}`)(app)
  })
}
