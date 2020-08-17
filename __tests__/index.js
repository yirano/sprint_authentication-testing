const supertest = require('supertest')
const server = require('../index')
const db = require('../database/dbConfig')

let token

// afterAll(async () => {
// 	await db.destroy()
// })

describe('Test Endpoints (Unauthorized)', () => {
	it("GET '/'", async () => {
		const res = await supertest(server).get('/api/jokes/')
		expect(res.statusCode).toBe(401)
	})
})
