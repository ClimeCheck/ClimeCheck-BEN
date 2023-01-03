const Util = require('./../libraries/Utility')
const _config = require('./../config/app.json')

const ParserDAO = {
    state_process: (data, jsonObj, callback) => {
        const dataModel = require('./../model/DataModel')
        switch(data.title){
            case "PurpleAir":
                ParserDAO._purple_air(data.title, jsonObj, (item) => {
                    if (item) {
                        dataModel.save(item, (state) => {
                            return callback(state)
                        })
                    } else 
                        return callback(false)
                }) 
                break

            default:
                break
        }
    },

    _feed_data: (data, callback) => {
        if (data.format == 'JSON'){
            Util.getJson(data, (jsonObj) => {
                if (jsonObj) {
                    ParserDAO.state_process(data, jsonObj,  (state) => {
                        if (state && state._id) 
                            return callback({status: true, msg:"Feed successfully parsed."})
                        else 
                            return callback({status:false, msg:"Error saving data..."})
                    })
                } else {
                    return callback({status:false, msg:"Error fetching data..."})
                }
            })
        }
    },

    _purple_air: (data_source, raw, callback) => {
        if (raw && raw.data) {
            raw.data.forEach((item) => {
                const data = {
                    index: item[0],
                    timestamp: item[1],
                    data_source: data_source,
                    device_name: item[2],
                    device_manufacturer: data_source,
                    device_model: item[4],
                    coordinates: [item[6], item[5]],
                    location_type: item[3],
                    temperature: item[8],
                    humidity: item[7],
                    pressure: item[9],
                    dataset: {
                        O3:item[10],
                        PM10:item[11],
                        PM25: item[12],
                        PM100: item[13]
                    }
                }
                return callback(data)
            })           
        }
        return callback(false)
    }
}



module.exports = ParserDAO