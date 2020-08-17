const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authenticate = require('./auth/authenticate-middleware.js')
const authRouter = require('./auth/auth-router.js')
const jokesRouter = require('./jokes/jokes-router.js')

const server = express()
const PORT = process.env.PORT || 3300

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/jokes', authenticate, jokesRouter)
// server.use('/api/jokes', jokesRouter)

server.use((err, req, res, next) => {
	console.dir(err)
	res.status(500).json({ errorMessage: 'Something went wrong' })
})

if (!module.parent) {
	server.listen(PORT, () => {
		console.log(`\n=== Server listening on port ${PORT} ===\n`)
	})
}

module.exports = server
