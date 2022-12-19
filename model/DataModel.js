const Base = require('./BaseModel')
const schemaInit = require('./schema/DataSchema')

const modelInit = Base.extend('DataModel', {
    init: function() {
        this._super(schemaInit,"DATA")
    }
})

module.exports = new modelInit()