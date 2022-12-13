const Connector = require('./Connector')
const _config = require('./../config/app.json')
const { model } = require('mongoose')

const Mongo = {
    _client: Connector.MongoDB(),

    _get: (model, params, callback) => {
        let query = model.findOne(params.conditions)
        if (params.fields)
            query.select(params.fields)
        query.exec((err, data) => {
            if (err)
                return callback(Mongo.handleError(err))
            else 
                return callback(data)
        })
    },

    _get_bulk: (model, params, callback) => {
        if (!params.limit) 
             params.limit = _config.query_limit
        let query = model.find(params.conditions).limit(params.limit)

        if (params.sort)
            query.sort(params.sort)

        if (params.skip)
            query.skip(params.skip)

        if (params.fields)
            query.select(params.fields)

        query.exec((err, data) => {
            if (err)
                return callback(Mongo.handleError(err))
            else 
                return callback(data)
        })
    },

    _save: (model, callback) => {
        model.save((err, data) => {
            if (err)
                return callback(Mongo.handleError(err))
            else 
                return callback(data)
        }) 
    },

    _update: (model, condition, data, callback) => {
        model.findOneAndUpdate(condition, {$set:data}, {new:true}, (err, data) => {
            if (err)
                return callback(Mongo.handleError(err))
            else
                return callback(data)
        })
    },

    _delete: (model, condition, callback) => {
        model.remove(condition, (err, resp) => {
            if (err)
                return callback(Mongo.handleError(err))
            else
                return callback(resp)
        })
    },

    handleError: (report) => {
        return {"error":true, "message":report}
    }
}

module.exports = Mongo