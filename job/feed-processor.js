const Cron = require('./../dao/CronDAO')
const Logger = require('./../libraries/Logger')

exports.handler =  () => {
    Cron.pull_feed_data((resp) => {
        if (resp) 
            Logger.init({type:"info", msg:resp.msg})
        else
            return ({msg:"Failed to process"})
    })
   
}