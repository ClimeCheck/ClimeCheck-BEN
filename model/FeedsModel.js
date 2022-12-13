const Base = require('./BaseModel')
const schemaInit = require('./schema/FeedsSchema')

const modelInit = Base.extend('FeedsModel', {
    init: function() {
        this._super(schemaInit,"FEEDS")
    }
})

module.exports = new modelInit()