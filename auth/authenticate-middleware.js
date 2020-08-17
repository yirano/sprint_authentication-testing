/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')

function authenticate() {
	return async (req, res, next) => {
		try {
			const authError = { message: "You're not authorized" }
			const token = process.env.TOKEN || req.cookies.token
			// console.log(req.cookies.token)
			if (!token) {
				return res.status(401).json(authError)
			}
			// console.log('MIDDLWARE ', req.session)
			if (process.env.NODE_ENV === 'development') {
				if (!req.session || !req.session.user) {
					return res.status(418).json({ message: 'What you meeeeean?' })
				}
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
