process.env.NODE_ENV = 'test';
const connection = require('../db/connection.js')
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
const request = require('supertest');
chai.use(require('chai-sorted'))

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
            it('GET: status 404, invalid username', () => {
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
            it('GET status 200, responds with an array of comments', () => {
                return request(app)
                    .get('/api/articles/5/comments')
                    .expect(200)
                    .then(res => {
                        expect(res.body.comments).to.be.an('array')
                        expect(res.body.comments[0]).to.contain.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
                        expect(res.body.comments[1]).to.contain.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
                    })
            });
            it('GET status 200, responds with an array of comments, sorted default by created_at, default descending', () => {
                return request(app)
                    .get('/api/articles/1/comments?sort_by=created_at')
                    .expect(200)
                    .then(res => {
                        expect(res.body.comments).to.be.descendingBy('created_at')
                    })
            });
            it('GET status 200, responds with an array of comments, sorted default by created_at, ascending order', () => {
                return request(app)
                    .get('/api/articles/1/comments?order=asc')
                    .expect(200)
                    .then(res => {
                        expect(res.body.comments).to.be.ascendingBy('created_at')
                    })
            })
            it('GET status 200, responds with an array of comments, sorted by body, ascending order', () => {
                return request(app)
                    .get('/api/articles/1/comments?sort_by=body&order=asc')
                    .expect(200)
                    .then(res => {
                        expect(res.body.comments).to.be.ascendingBy('body')
                    })
            })
            it('GET status 200, responds with an array of comments, sorted by author, descending order', () => {
                return request(app)
                    .get('/api/articles/1/comments?sort_by=author')
                    .expect(200)
                    .then(res => {
                        expect(res.body.comments).to.be.descendingBy('author')
                    })
            })
            it('GET status 404, when query(sort) for column which does not exists', () => {
                return request(app)
                    .get('/api/articles/1/comments?sort_by=wrong_column')
                    .expect(404)
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
                        expect(body.msg).to.equal('Invalid id')
                    })
            })
        });
        describe('GET /articles', () => {
            it('GET status 200, respond with array of article objects',  () => {
                return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then(res => {
                        expect(res.body.articles).to.be.an('array');
                        expect(res.body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
                    })

            })
        })


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
                        expect(body.msg).to.equal('Invalid id')
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
            it('POST: status 400, missing required fields', () => {
                return request(app)
                .post('/api/articles/4/comments')
                .send({})
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('No data provided!');
                })
                
            })
        })

    })
})