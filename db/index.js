var mongoose = require('mongoose')

let MONGOLAB_URI = 'mongodb://localhost/bankstorage'

if (process.env.NODE_ENV === 'production') {
  MONGOLAB_URI = process.env.MONGOLAB_URI
}

const options = {}

mongoose.connect(MONGOLAB_URI, options, (error, result) => {
  if (error) {
    console.log(error)
  } else {
    console.log(`connect to mongodb at ${MONGOLAB_URI}`)
  }
})

function mongoConnectedEvent() {
  console.log('mongo connected')
}

function mongoDisconnectedEvent() {
  console.log('mongo disconnected')
}

function mongoConnectErrorEvent() {
  console.log('something went wrong, cannot connect to mongodb')
}

mongoose.connection.on('connect', mongoConnectedEvent)
mongoose.connection.on('disconnect', mongoDisconnectedEvent)
mongoose.connection.on('error', mongoConnectErrorEvent)
