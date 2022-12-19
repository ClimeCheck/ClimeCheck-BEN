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
                            return callback(state)
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
                    timestamp: raw.data_time_stamp,
                    data_source: data_source,
                    device_name: item[1],
                    device_manufacturer: data_source,
                    device_model: item[3],
                    coordinates: [item[5], item[4]],
                    location_type: item[2],
                    temperature: item[7],
                    humidity: item[6],
                    pressure: item[8],
                    dataset: {
                        O3:item[9],
                        PM10:item[10],
                        PM25: item[11],
                        PM100: item[12]
                    }
                }
                return callback(data)
            })           
        }
        return callback(false)
    }
}



module.exports = ParserDAO