const supertest = require('supertest')
const server = require('../index')
const db = require('../database/dbConfig')
const auth = require('../auth/authenticate-middleware')
// const jest = require('jest')

let token

beforeAll(async () => {
	await db.seed.run()
})

afterAll(async () => {
	await db.destroy()
})

describe('Test Endpoints (Unauthorized)', () => {
	it("GET '/' (Unathorized)", async () => {
		const res = await supertest(server).get('/api/jokes/')
		expect(res.statusCode).toBe(401)
	})

	it("POST '/login' (Invalid Credentials)", async () => {
		const res = await supertest(server).post('/api/auth/login').send({ username: 'Hello', password: 'Goodbye' })
		expect(res.statusCode).toBe(401)
	})
})

describe('Register New User', () => {
	it('POST /register (User exists)', async () => {
		const res = await supertest(server)
			.post('/api/auth/register')
			.send({ username: 'newdean', password: 'password' })
		expect(res.statusCode).toBe(409)
	})
	it("POST '/register (New User)", async () => {
		const res = await supertest(server)
			.post('/api/auth/register')
			.send({ username: 'newuser', password: 'password' })
		expect(res.statusCode).toBe(201)
	})
})

describe('Test Endpoints (Authorized)', () => {
	it("POST '/login' (Valid Credentials)", async () => {
		const res = await supertest(server).post('/api/auth/login').send({
			username: 'newdean',
			password: 'password'
		})
		token = res.body.token
		expect(res.statusCode).toBe(200)
	})

	// it('GET THROUGH THE SESSION RESTRICTION', async () => {
	// 	const res = await supertest(server).post('/api/auth/login').send({
	// 		username: 'newdean',
	// 		password: 'password'
	// 	})
	// 	expect(res.statusCode).toBe(200)
	// })

	it("GET '/' (Properly Authenticated)", async () => {
		const res = await supertest(server).get('/api/jokes').set('Cookie', `token=${token}`)
		expect(res.body.length).toBe(20)
		expect(res.statusCode).toBe(200)
	})

	it("GET '/logout', Logs out", async () => {
		const res = await supertest(server).get('/api/auth/logout')
		expect(res.statusCode).toBe(200)
		expect(res.request.header['Cookie']).toBeUndefined()
		expect(res.header['set-cookie'][0]).toBe('token=; Path=/')
	})

	it("GET '/logout' Sends user message", async () => {
		const res = await supertest(server).get('/api/auth/logout')
		expect(res.body.message).toEqual('See you next time!')
	})
})
