const request = require("supertest");
const app = require("../index");
const DB = require('../dbConnection')
const DatabaseConnectionSingleton = require("../dbConnection");

describe('log in user success', () => {
    it('return success request if user provide correct email and password', async () => {
        DatabaseConnectionSingleton.getInstance();
        const respond = await request(app).post('/main/login').send({
            email: 'user@gmail.com',
            password: '12345'
        })
        expect(respond.status).toEqual(200)
    });
})

describe('log in user fail', () => {
    it('return bad request if user not provide email or password', async () => {
        // DatabaseConnectionSingleton.getInstance();
        const respond = await request(app).post('/main/login').send({
            email: 'failtest@gmail.com',
            password: '12345678'
        })
        expect(respond.status).toEqual(401)
    });
})
