const _config = require('./../config/app.json')
const feedsModel = require('./../model/FeedsModel')

const CronDAO = {
    pull_feed_data: (callback) => {
        feedsModel.findAll({}, (state) => {
            if (state && state.length > 0){
                const parserDAO = require('./ParserDAO')
                state.forEach((feed) => {
                   parserDAO._feed_data(feed, (feed_data) => {
                    if (feed_data && feed_data._id) {
                        console.log("Success...")
                        // return callback("Success...")
                    } 
                   })
                })
            }
        })
    }
}
CronDAO.pull_feed_data()
module.exports = CronDAO