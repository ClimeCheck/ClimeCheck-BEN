const _config = require('./../config/app.json')

const Util = {
    date_time: function(dt){
        const moment = require('moment-timezone');
        return moment.tz(dt, "Africa/Lagos").format('YYYY-MM-DD HH:mm:ss');
    },

    param_extract: (req) => {
        let data = {}
        if (req.fields) 
            data = req.fields
        else if (req.body)
            data = req.body
        return data
    },

    query_filter: (param) => {
        //{conditions:{field1:value1}, skip:value, sort:{field:value}, limit:value}
        let query = {}, excluded_key = ["sort", "skip", "order", "limit"], fields = {}
        for (key in param) {
            if (param[key] !== "" && excluded_key.indexOf(key) == -1) {
                fields[key] = param[key]
            }
        }
        query.conditions = fields
        if (param.skip)
            query.skip = parseInt(param.skip)

        if (param.limit)
            query.limit = parseInt(param.limit)
        
        if (param.sort) {
            let sort = {} 
            sort[param.sort] = (param.order == 'asc') ? 'asc' : 'desc'
            query.sort = sort
        }
    
        return query
    },

    resp: function(res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res;
    },

    getJson: (data, callback) => {
        let options = {url:data.url}
        const request = require('request')
        if (data.auth == 'headers') {  
            options.headers = {[data.key]: data.value}
        }
        if (data.auth == 'token') {
            options['Bearer Token '] = data.token
        }
        if (data.auth == 'normal'){
            options.username = data.username
            options.password = data.password
        }
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200){
                callback(JSON.parse(body))
            } else 
                callback(null)
        })
    } 
} 

module.exports = Util 