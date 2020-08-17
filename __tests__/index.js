const supertest = require('supertest')
const server = require('../index')
const db = require('../database/dbConfig')

let token

afterAll(async () => {
	await db.destroy()
})

describe('Test Endpoints (Unauthorized)', () => {
	it('Test is connecetd', async () => {
		expect(2 + 2).toBe(2)
	})
})
