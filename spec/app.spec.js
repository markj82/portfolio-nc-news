process.env.NODE_ENV = 'test';
const connection = require('../db/connection.js')
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
const request = require('supertest');

describe('/', () => {
    after(() => connection.destroy())
    beforeEach(() => connection.seed.run())

    describe('/api', () => {
        describe('GET /topics', () => {
            it('GET: status 200, should return array of topics objects', () => {
                return request(app)
                    .get('/api/topics')
                    .expect(200)
                    .then(res => {
                        expect(res.body.topics).to.be.an('array');
                        expect(res.body.topics[0]).to.contain.keys('slug', 'description')
                    })
            });
            it('GET: status 404, invalid route', () => {
                return request(app)
                    .get('/api/topics/wrong-address')
                    .expect(404)
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
            });
            it('GET: status 404, invalid username, ?or 400 bad request?', () => {
                return request(app)
                    .get('/api/users/wrong-username')
                    .expect(404)
                    .then(res => {
                        expect(res.body.msg).to.equal('User not found');
                    })
            })
        })
        describe('GET /articles', () => {
            it('GET: status 200, should return an object based on article id', () => {
                return request(app)
                    .get('/api/articles/1')
                    .expect(200)
                    .then(res => {
                        expect(res.body.article).to.be.an('object')
                        expect(res.body.article).to.contain.keys('article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at', 'comment_count')
                    })
            });
            it('GET status 404, when passing valid id, which is NOT in the database', () => {
                return request(app)
                    .get('/api/articles/99999')
                    .expect(404)
            });
            it('GET status 400 - bad request, when passing invalid id, ie string', () => {
                return request(app)
                    .get('/api/articles/not-a-valid-id')
                    .expect(400)
                    .then(({body}) => {
                        expect(body.msg).to.equal('Invalid article id')
                    })
            })
        });
        describe('PATCH /articles', () => {
            it('PATCH: status 201, respond with updated article', () => {
                return request(app)
                    .patch('/api/articles/5')
                    .send({ inc_votes: 35})
                    .expect(201)
                    .then(res => {
                        expect(res.body.article.votes).to.equal(35);
                    })
            });
            it('PATCH: status 404, article that does not exists', () => {
                return request(app)
                    .patch('/api/articles/99999999')
                    .send({ inc_votes: 40})
                    .expect(404)  
            });
            it('PATCH: status 400, invalid type of article id, i.e string', () => {
                return request(app)
                    .patch('/api/articles/not-a-valid-id')
                    .send({ inc_votes: 35})
                    .expect(400)
                    .then(({body}) => {
                        expect(body.msg).to.equal('Invalid article id')
                    })
            })
        })
        describe('POST /articles', () => {
            it('POST: status 201, responds with posted comment', () => {
                return request(app)
                    .post('/api/articles/4/comments')
                    .send({
                        username: 'butter_bridge',
                        body: 'This is really nice comment LOL'
                    })
                    .expect(201)
                    .then(({body}) => {
                        expect(body.comment).to.be.an('object');
                        expect(body.comment).to.contain.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body');
                        expect(body.comment.author).to.equal('butter_bridge')
                        expect(body.comment.body).to.equal('This is really nice comment LOL')
                    })
            })
        })
    })
})