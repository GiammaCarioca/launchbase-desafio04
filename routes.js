const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const data = require('./data.json')

routes.get('/', function(req, res) {
	return res.redirect('/teachers')
})

routes.get('/teachers', function(req, res) {
	return res.render('teachers/index', { teachers: data.teachers })
})

routes.get('/teachers/create', function(req, res) {
	return res.render('teachers/create')
})

routes.post('/teachers', teachers.post)

routes.get('/students', function(req, res) {
	return res.send('students')
})

module.exports = routes
