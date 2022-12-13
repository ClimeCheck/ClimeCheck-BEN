const express = require('express')
const router = express.Router()
const _config = require('../config/app.json')

const api = _config.app_name+_config.app_base+_config.app_version

router.use(api+'/docs', require('./document'))
router.use(api+'/feeds', require('./feeds'))

module.exports = router