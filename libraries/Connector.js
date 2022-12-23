const dotenv = require('dotenv').config()
const _config = require('../config/app.json')

const Connector = {
    _mongo:null,

    MongoDB: () => {
        if (Connector._mongo === null) {
            const mongoose = require('mongoose')
            const url = process.env.NODE_ENV == 'development' ? 'mongodb://'+_config.mongodb.host+':'+_config.mongodb.port+'/'+_config.mongodb.db :
                          process.env.MONGODB_URL
            Connector._mongo = mongoose.connection

            Connector._mongo.once('open', () => {console.log('Database Connection Initiated')})
            Connector._mongo.on('error', () => {console.log('Error Connecting to Database'); process.exit(1)})
            mongoose.Promise = global.Promise
            mongoose.set('strictQuery', false);
            mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            return Connector._mongo
        }
    }
}

module.exports = Connector