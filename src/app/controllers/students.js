const fs = require('fs')
const Intl = require('intl')
const data = require('../../../data.json')

exports.index = function(req, res) {
	return res.render('students/index', { students: data.students })
}

exports.show = function(req, res) {
	const { id } = req.params

	const foundStudent = data.students.find(student => student.id == id)

	if (!foundStudent) return res.send('Student not found!')

	return res.render('students/show', { foundStudent })
}

exports.create = function(req, res) {
	return res.render('students/create')
}

exports.post = function(req, res) {
	const keys = Object.keys(req.body)

	for (key of keys) {
		if (req.body[key] == '') {
			return res.send('Please, fill all the fields!')
		}
	}

	const student = {
		id: Number(data.students.length + 1),
		...req.body
	}

	data.students.push(student)

	fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
		if (err) return res.send('Write file error!')

		return res.redirect('/students')
	})
}

exports.edit = function(req, res) {
	const { id } = req.params

	const foundStudent = data.students.find(student => student.id == id)

	if (!foundStudent) return res.send('Student not found!')

	return res.render('students/edit', { foundStudent })
}

exports.put = function(req, res) {
	const { id } = req.body
	let index = 0

	const foundStudent = data.students.find(function(student, foundIndex) {
		if (id == student.id) {
			index = foundIndex
			return true
		}
	})

	if (!foundStudent) return res.send('Student not found!')

	const student = {
		...foundStudent,
		...req.body
	}

	data.students[index] = student

	fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
		if (err) return res.send('Write file error!')

		return res.redirect(`/students/${id}`)
	})
}

exports.delete = function(req, res) {
	const { id } = req.body

	const filteredStudents = data.students.filter(function(student) {
		return student.id != id
	})

	data.students = filteredStudents

	fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
		if (err) return res.send('Write error!')

		return res.redirect('/students')
	})
}
