const express = require('express')
const router = express.Router()
const feedsDAO = require('./../dao/FeedsDAO')
const Util = require('./../libraries/Utility')

router.post('/create', (req, res) => {
    feedsDAO.create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    feedsDAO.update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    feedsDAO.feed_by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', (req, res) => {
    feedsDAO.pull_feed(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    feedsDAO.delete_feed(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})


module.exports = router