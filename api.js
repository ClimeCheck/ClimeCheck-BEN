const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const _config = require('./config/app.json')
const Logger = require('./libraries/Logger')
//const cors = require('cors')
const cookieParser = require('cookie-parser')


const app = express() 

//app middelwares
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended:true}))

//app.use(cors())
app.use(cookieParser())

app.use(require('./controllers'))

app.listen(process.env.PORT, () => {
    Logger.init({msg:'Listening on http://[:]'+process.env.PORT+_config.app_name+_config.app_base+_config.app_version})
})
