process.env.NODE_ENV = 'test';
const connection = require('../db/connection.js')
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
const request = require('supertest');

describe('/', () => {
    after(() => connection.destroy())
    beforeEach(() => connection.seed.run())

    describe('/topics', () => {
        describe('GET /topics', () => {
            it('GET: status 200, should return array of topics objects', () => {
                return request(app)
                    .get('/api/topics')
                    .expect(200)
                    .then(res => {
                        expect(res.body.topics).to.be.an('array');
                        expect(res.body.topics[0]).to.contain.keys('slug', 'description')
                    })
            })
        })
        describe('GET /users', () => {
            it('GET: status 200, should return an object based on passed username', () => {
                return request(app)
                    .get('/api/users/rogersop')
                    .expect(200)
                    .then(res => {
                        expect(res.body.user).to.be.an('object')
                        expect(res.body.user).to.contain.keys('username', 'avatar_url', 'name');
                    })
            })
        })
    })
})