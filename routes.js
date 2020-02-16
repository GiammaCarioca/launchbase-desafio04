const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const data = require('./data.json')

routes.get('/', function(req, res) {
	return res.redirect('/teachers')
})

routes.get('/teachers', teachers.index)

routes.get('/teachers/create', function(req, res) {
	return res.render('teachers/create')
})

routes.get('/teachers/:id', teachers.show)

routes.get('/teachers/:id/edit', teachers.edit)

routes.post('/teachers', teachers.post)

routes.get('/students', function(req, res) {
	return res.send('students')
})

module.exports = routes
