const _config = require('./../config/app.json')
const feedsModel = require('./../model/FeedsModel')
const Logger = require('./../libraries/Logger')

const CronDAO = {
    pull_feed_data: (callback) => {
        feedsModel.findAll({}, (state) => {
            if (state && state.length > 0){
                const parserDAO = require('./ParserDAO')
                state.forEach((feed) => {
                   parserDAO._feed_data(feed, (response) => {
                    if (response && response.status) {
                        callback(response)
                    } 
                   })
                })
            }
        })
    }
}

module.exports = CronDAO