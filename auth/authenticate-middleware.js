/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')

function authenticate() {
	return async (req, res, next) => {
		try {
			const authError = { message: "You're not authorized" }
			const token = process.env.TOKEN
			if (!token) {
				return res.status(401).json(authError)
			}
			jwt.verify(token, process.env.SECRET, (err) => {
				if (err) {
					return res.status(401).json(authError)
				}

				next()
			})
		} catch (error) {
			next(error)
		}
	}
}

module.exports = authenticate
