const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../auth/auth-model')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res, next) => {
	// implement registration
	try {
		const { username, password } = req.body
		const user = await Users.findUser(username).first()
		console.log(user)
		if (user) {
			return res.status(409).json({ message: 'Username already exists' })
		}

		const newUser = await Users.addUser({
			username,
			password: bcrypt.hash(password, process.env.NODE_ENV === 'development' ? 12 : 1)
		})

		res.status(201).json(newUser)
	} catch (error) {
		next(error)
	}
})

// router.post('/login', (req, res) => {
// 	// implement login
// })

module.exports = router
