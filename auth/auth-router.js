const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../auth/auth-model')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res, next) => {
	// implement registration
	try {
		const { username, password } = req.body
		const user = await Users.findUser(username).first()
		// console.log(user)
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

router.post('/login', async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findUser(username).first()
		if (!user) {
			return res.status(401).json({ message: 'Invalid Credentials' })
		}

		const passwordValid = bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: 'Invalid Credentials'
			})
		}

		const payload = {
			id: user.id,
			username: user.username
		}

		const token = jwt.sign(payload, process.env.SECRET)
		res.cookie('token', token)
		process.env.TOKEN = token
		req.session.user = payload
		// console.log(req.session.user)
		res.json({
			...payload,
			token
		})
	} catch (error) {
		next(error)
	}
})

router.get('/logout', async (req, res, next) => {
	try {
		process.env.TOKEN = ''
		res.cookie('token', '')
		res.status(200).json({ message: 'See you next time!' })
	} catch (error) {
		next(error)
	}
})

module.exports = router
