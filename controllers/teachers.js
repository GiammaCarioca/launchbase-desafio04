const fs = require('fs')
const data = require('../data.json')

exports.post = function(req, res) {
	const keys = Object.keys(req.body)

	for (key of keys) {
		if (req.body[key] == '') {
			return res.send('Please, fill all the fields!')
		}
	}

	;(req.body.birthday = Date.parse(req.body.birthday)),
		(req.body.created_at = Date.now())

	const teacher = {
		id: data.teachers.length + 1,
		...req.body
	}

	data.teachers.push(teacher)

	fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
		if (err) return res.send('Write file error!')

		return res.redirect('/teachers')
	})
}
