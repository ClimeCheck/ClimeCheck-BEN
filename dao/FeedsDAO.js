const Resp = require('./Response')
const feedsModel = require('./../model/FeedsModel')
const Util = require('./../libraries/Utility')

const FeedsDAO = {
    create: (param, callback) => {
        let error = []
        if (!param.title)error.push('Name is required')
        if (!param.url)error.push('Url is required')

        if (error.length === 0) {
            const data = {title:param.title, url:param.url, auth:param.auth, key:param.key, value:param.value, 
                        token:param.token, format:param.format, username:param.username, password:param.password}
            feedsModel.save(data, (resp) => {
                if (resp._id) 
                    return callback(Resp.success({msg:"New feed added.", resp:resp}))
                else   
                    return callback(Resp.error({msg:"Error Encountered", resp:{}}))
            })
        } else {
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
        }
    }, 

    update: (param, callback) => {
        let error = [], data = {}
        if (!param.identity)error.push('Provide an identity')
        if (param.title)data.title = param.title
        if (param.url)data.url = param.url
        if (param.auth)data.auth = param.auth
        if (param.key)data.key = param.key
        if (param.value)data.value = param.value
        if (param.token)data.token = param.token
        if (param.username)data.username = param.username
        if (param.password)data.password = param.password
        if (param.format)data.format = param.format

        if (error.length === 0) {
            if (data) {
                feedsModel.update({_id:param.identity}, data, (resp) => {
                    if (!resp._id) {
                        return callback(Resp.error({msg:"Something went wrong", resp:null}))
                    } else {
                        return callback(Resp.success({msg:"Update Successful", resp:resp}))
                    }
                })
            }
        } else {
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
        }
    },

    feed_by_identity: (identity, callback) => {
        feedsModel.findOne({conditions:{_id:identity}}, (state) => {
            if (state && !state.error) {
                return callback(Resp.success({msg:"Data found", resp:state}))
            } else {
                return callback(Resp.error({msg:"Data not found", resp:null}))
            }
        })
    },

    pull_feed: (param, callback) => {
        feedsModel.findAll(Util.query_filter(param), (state) => {
            if (state && !state.error) {
                return callback(Resp.success({msg:"Data found.", resp:state}))
            } else 
                return callback(Resp.error({msg:"Data not found", resp:null}))
        })
    },

    delete_feed: (identity, callback) => {
        feedsModel.del(identity, (resp) => {
            if (resp)
                return callback(Resp.success({msg:"Delete Successful", resp:true}))
            else    
                return callback(Resp.error({msg:"Error Encountered.", resp:null}))
        })
    }
}

module.exports = FeedsDAO
