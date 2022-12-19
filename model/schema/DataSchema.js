const mongoose = require('mongoose')

const schemaDef = new mongoose.Schema({
    index:{type:String, unique:true},
    timestamp:{type:Date, default:null},
    data_source:{type:String, default:""},
    device_name:{type:String, default:""},
    device_manufacturer:{type:String, default:null},
    device_model:{type:String, default:""},
    coordinates:{type:[Number], default:[]}, //[longitude, latitude]
    location_type:{type:Number, default:null},
    temperature:{type:Number, default:null},
    humidity:{type:Number, default:null},
    pressure:{type:Number, default:null},
    dataset:{
        PM10:{type:Number, default:null},
        PM25:{type:Number, default:null},
        PM100:{type:Number, default:null},
        PM250:{type:Number, default:null},
        CO:{type:Number, default:null},
        CO2:{type:Number, default:null},
        NO:{type:Number, default:null},
        NO2:{type:Number, default:null},
        O3:{type:Number, default:null},
        SO:{type:Number, default:null},
        NH3:{type:Number, default:null}
    },
    date_added:{type:Date, default:Date.now},
    date_modified:{type:Date, default:Date.now}
})

module.exports = mongoose.model("dataset", schemaDef)