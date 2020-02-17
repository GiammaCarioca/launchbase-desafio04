module.exports = {
	age(timestamp) {
		const today = new Date()
		const birthDate = new Date(timestamp)

		let age = today.getFullYear() - birthDate.getFullYear()
		const month = today.getMonth() - birthDate.getMonth()

		if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
			age = age - 1
		}

		return age
	},
	date(timestamp) {
		const date = new Date(timestamp)

		const year = date.getUTCFullYear()
		const month = `0${date.getUTCMonth() + 1}`.slice(-2)
		const day = `0${date.getUTCDate()}`.slice(-2)

		return {
			day,
			month,
			year,
			iso: `${year}-${month}-${day}`,
			birthDay: `${day}/${month}`,
			format: `${day}/${month}/${year}`
		}
	},
	graduation(education) {
		switch (education) {
			case 'highschool':
				return 'Ensino Médio Completo'
			case 'bachelors':
				return 'Ensino Superior Completo'
			case 'masters':
				return 'Mestrado'
			case 'doctors':
				return 'Doutorado'
			default:
				console.log('No educational level found!')
		}
	},
	grade(grade) {
		switch (grade) {
			case 'fifth':
				return '5º ano do ensino fundamental'
			case 'sixth':
				return '6º ano do ensino fundamental'
			case 'seventh':
				return '7º ano do ensino fundamental'
			case 'eighth':
				return '8º ano do ensino fundamental'
			case 'freshman':
				return '9º ano do ensino fundamental'
			case 'sophomore':
				return '1º ano do ensino médio'
			case 'junior':
				return '2º ano do ensino médio'
			case 'senior':
				return '3º ano do ensino médio'
			default:
				console.log('No grade found!')
		}
	}
}
