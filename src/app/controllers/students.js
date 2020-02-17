const fs = require('fs')
const Intl = require('intl')
const data = require('../../../data.json')
const { age, date, grade } = require('../../lib/utils')

exports.index = function(req, res) {
	return res.render('students/index', { students: data.students, grade })
}

exports.show = function(req, res) {
	const { id } = req.params

	const foundStudent = data.students.find(student => student.id == id)

	if (!foundStudent) return res.send('Student not found!')

	const student = {
		...foundStudent,
		age: age(foundStudent.birthday),
		grade: grade(foundStudent.grade)
	}

	return res.render('students/show', { student })
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

	let { avatar_url, full_name, email, birthday, weekly_hours, grade } = req.body

	birthday = Date.parse(birthday)

	let id = 1
	const lastStudent = data.students[data.students.length - 1]

	if (lastStudent) {
		id = Number(lastStudent.id) + 1
	}

	const student = {
		id,
		avatar_url,
		full_name,
		email,
		birthday,
		weekly_hours,
		grade
	}

	data.students.push(student)

	fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
		if (err) return res.send('Write file error!')

		return res.redirect(`/students/${id}`)
	})
}

exports.edit = function(req, res) {
	const { id } = req.params

	const foundStudent = data.students.find(student => student.id == id)

	if (!foundStudent) return res.send('Student not found!')

	const student = {
		...foundStudent,
		birthday: date(foundStudent.birthday).iso
	}

	return res.render('students/edit', { student })
}

exports.update = function(req, res) {
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
