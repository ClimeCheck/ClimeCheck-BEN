const mongoose = require('mongoose')

const schemaDef = new mongoose.Schema({
    title:{type:String, unique:true},
    url:{type:String, default:""},
    public_key:{type:String, default:""},
    private_key:{type:String, default:""},
    username:{type:String, default:""},
    password:{type:String},
    format:{type:String, default:""},
    del_flag:{type:Number, default:0}, 
    date_added:{type:Date, default:Date.now},
    date_modified:{type:Date, default:Date.now}
})

module.exports = mongoose.model("feeds", schemaDef)