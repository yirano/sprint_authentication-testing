/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')

function authenticate() {
	return async (req, res, next) => {
		try {
			const authError = { message: 'Invalid Creds' }
			const token = req.cookies.token
			if (!token) {
				res.status(401).json(authError)
			}
			jwt.verify(token, process.env.SECRET, (err) => {
				if (err) {
					res.status(401).json(authError)
				}

				next()
			})
		} catch (error) {
			console.log('INSIDE MIDDLEWARE ', error)
			next(error)
		}
	}
}

module.exports = authenticate
