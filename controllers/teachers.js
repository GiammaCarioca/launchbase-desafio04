const fs = require('fs')
const Intl = require('intl')
const data = require('../data.json')
const { age, date } = require('../lib/utils')

exports.index = function(req, res) {
	for (teacher of data.teachers) {
		teacher.age = age(teacher.birthday)
		teacher.created_at = new Intl.DateTimeFormat('pt-BR').format(
			teacher.created_at
		)
	}

	return res.render('teachers/index', { teachers: data.teachers })
}

exports.show = function(req, res) {
	const { id } = req.params

	const foundTeacher = data.teachers.find(teacher => teacher.id == id)

	if (!foundTeacher) return res.send('Teacher not found!')

	const teacher = {
		...foundTeacher,
		fields_of_study: String(foundTeacher.fields_of_study).split(','),
		age: age(foundTeacher.birthday)
		// created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
	}

	return res.render('teachers/show', { teacher })
}

exports.post = function(req, res) {
	const keys = Object.keys(req.body)

	for (key of keys) {
		if (req.body[key] == '') {
			return res.send('Please, fill all the fields!')
		}
	}

	req.body.birthday = Date.parse(req.body.birthday)
	req.body.created_at = Date.now()

	const teacher = {
		id: Number(data.teachers.length + 1),
		...req.body
	}

	data.teachers.push(teacher)

	fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
		if (err) return res.send('Write file error!')

		return res.redirect('/teachers')
	})
}

exports.edit = function(req, res) {
	const { id } = req.params

	const foundTeacher = data.teachers.find(teacher => teacher.id == id)

	if (!foundTeacher) return res.send('Teacher not found!')

	const teacher = {
		...foundTeacher,
		birthday: date(foundTeacher.birthday).iso
	}

	return res.render('teachers/edit', { teacher })
}
