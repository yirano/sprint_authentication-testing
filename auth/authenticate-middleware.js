/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')

function authenticate() {
	const authError = { message: 'Invalid Creds' }
	return async (req, res, next) => {
		try {
			const token = req.header.cookie || req.cookie.token
			if (!token) {
				res.status(401).json(authError)
			}
			jwt.verify(token, process.env.SECRET, (err, decoded) => {
				if (err) {
					res.status(401).json(authError)
				}

				next()
			})
		} catch (error) {
			next(error)
		}
	}
}
