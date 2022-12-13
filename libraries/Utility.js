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

    resp: function(res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res;
    }
}

module.exports = Util 