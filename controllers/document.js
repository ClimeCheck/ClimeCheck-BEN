const express = require('express')
const router = express.Router()
const path = require('path')
const YAML = require('yamljs')
const swaggerUIExpress = require('swagger-ui-express')
const swaggerDoc = YAML.load(path.join(__dirname, './../swagger.yaml'))

router.use('/', swaggerUIExpress.serve)
router.get('/', swaggerUIExpress.setup(swaggerDoc))

module.exports = router