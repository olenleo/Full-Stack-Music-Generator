const express = require('express')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(cors())


const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('build'))
app.use(express.json())
const initRoutes = require("./routes/index")
global.__basedir = __dirname  
app.use(express.urlencoded({extended : true}))
initRoutes(app)

module.exports = app