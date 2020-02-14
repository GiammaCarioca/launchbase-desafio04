const express = require('express')
const routes = express.Router()
const { teachers } = require('./data.json')

routes.get('/', function(req, res) {
	return res.redirect('/teachers')
})

routes.get('/teachers', function(req, res) {
	return res.render('teachers/index', { teachers })
})

routes.get('/teachers/create', function(req, res) {
	return res.render('teachers/create')
})

routes.post('/teachers', function(req, res) {
	return res.send('recebido!')
})

routes.get('/students', function(req, res) {
	return res.send('students')
})

module.exports = routes
