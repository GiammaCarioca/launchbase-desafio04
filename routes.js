const express = require('express')
const routes = express.Router()
const { teachers } = require('./data.json')

routes.get('/', function(req, res) {
	return res.render('index', { teachers })
})

module.exports = routes
