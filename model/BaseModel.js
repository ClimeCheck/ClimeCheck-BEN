const Class = require('class.extend')
const Mongo = require('./../libraries/Mongo')

const BaseModel = Class.extend('BaseModel', {
    _instance: () => {
        return this;
    },

    init: (schema, flag) => {
        this._schema = schema
        this._flag = flag.toLowerCase() 
    },

    findOne: (param, callback) => {
        Mongo._get(this._schema, param, (data) => {
            return callback(data)
        })
    },

    findAll: (param, callback) => {
        Mongo._get_bulk(this._schema, param, (data) => {
            return callback(data)
        })
    },

    save: (data, callback) => {
        Mongo._save(this._schema(data), (data) => {
            return callback(data)
        })
    },

    update: (condition, data, callback) => {
        Mongo._update(this._schema, condition, data, (data) => {
            return callback(data)
        })
    },

    del: (identity, callback) => {
        const condition = {_id:identity}
        const schema = this._schema
        Mongo._update(this._schema, condition, {del_flag: 1}, (data) => {
            Mongo._delete(schema, condition, (err) => {
                return callback(true)
            })
        })
    }
})

module.exports = BaseModel