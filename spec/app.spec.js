process.env.NODE_ENV = 'test';
const connection = require('../db/connection.js')
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
const request = require('supertest');
const jsonEndpoints = require('../endpoints.json')
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
            it('GET status 404, when give a valid article id that does not exist', () => {
                return request(app)
                    .get('/api/articles/999/comments')
                    .expect(404)
                    .then(({body}) => {
                        expect(body.msg).to.equal('comment not found')
                    })
                    
            })
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
            it('GET status 400, when query(sort) for column which does not exists', () => {
                return request(app)
                    .get('/api/articles/1/comments?sort_by=wrong_column')
                    .expect(400)
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
            it('GET status 200, respond with array of article objects, accept queries sort by created_at-ascending, filtered by author', () => {
                return request(app)
                    .get('/api/articles?sort_by=created_at&order=asc&author=icellusedkars')
                    .expect(200)
                    .then(res => {
                        expect(res.body.articles).to.be.an('array');
                        expect(res.body.articles[0].author).to.equal('icellusedkars')
                        expect(res.body.articles[1].author).to.equal('icellusedkars')
                        expect(res.body.articles[2].author).to.equal('icellusedkars')
                        expect(res.body.articles).to.be.ascendingBy('created_at')
                    })
            })
            it('GET status 200, respond with array of article objects, accept queries sort by body-descending, filter by topic', () => {
                return request(app)
                    .get('/api/articles?sort_by=body&order=desc&topic=mitch')
                    .expect(200)
                    .then(res => {
                        expect(res.body.articles).to.be.an('array');
                        expect(res.body.articles[0].topic).to.equal('mitch')
                        expect(res.body.articles[1].topic).to.equal('mitch')
                        expect(res.body.articles[2].topic).to.equal('mitch')
                        expect(res.body.articles).to.be.descendingBy('body')
                    })
            })
            
            it('GET status 400, invalid route ie treated_at instead of created_at', () => {
                return request(app)
                    .get('/api/articles?sort_by=treated_at')
                    .expect(400).then(res => {
                        expect(res.body.msg).to.equal('invalid sort_by query')
                    })
            });
            it('GET status 404, author does not exists', () => {
                return request(app)
                    .get('/api/articles?sort_by=created_at&order=asc&author=marek')
                    .expect(404)
                    .then(res => {
                        expect(res.body.msg).to.equal("Article not found");  
                    })
            })
            it('GET status 404, topic does not exists', () => {
                return request(app)
                    .get('/api/articles?sort_by=created_at&order=asc&author=icellusedkars&topic=ten_crazy_ice_cream')
                    .expect(404)
                    .then(res => {
                        expect(res.body.msg).to.equal("Article not found");  
                    })
            })

        })


        describe('PATCH /articles', () => {
            it('PATCH: status 200, respond with updated article', () => {
                return request(app)
                    .patch('/api/articles/5')
                    .send({ inc_votes: 35})
                    .expect(200)
                    .then(res => {
                        expect(res.body.article.votes).to.equal(35);
                    })
            });
            it('PATCH: status 404, article that does not exists', () => {
                return request(app)
                    .patch('/api/articles/9999')
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
            });
            it('PATCH: status 400, article id does exist but trying to send empty body', () => {
                return request(app)
                    .patch('/api/articles/5')
                    .send({})
                    .expect(400)
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
                    expect(res.body.msg).to.equal('Missing Required Information');
                })
                
            })
        })

        describe('PATCH /comments', () => {
            it('PATCH: status 200, responds with updated comment', () => {
                return request(app)
                    .patch('/api/comments/2')
                    .send({ inc_votes: 4})
                    .expect(200)
                    .then(({body}) => {
                        expect(body.comments.votes).to.equal(18)
                        expect(body.comments).to.contain.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body')
                    })
            });
            it('PATCH: status 200, when sent a body with no `inc_votes` property, but with valid id', () => {
                return request(app)
                    .patch('/api/comments/1')
                    .send({})
                    .expect(200)
                    .then(({body}) => {
                        expect(body.comments.comment_id).to.be.equal(1)
                        expect(body.comments.votes).to.be.equal(17)
                    })
            })
            it('PATCH: status 404, comment does not exists', () => {
                return request(app)
                    .patch('/api/comments/9999')
                    .send({ inc_votes: 9})
                    .expect(404)
            });
            it('PATCH: status 400, invalid type of comment id, i.e string', () => {
                return request(app)
                    .patch('/api/comments/not-a-valid-id')
                    .send({ inc_votes: 9})
                    .expect(400)
                    .then(({body}) => {
                        expect(body.msg).to.equal('Invalid id')
                    })
            });

        })
        describe('DELETE /comments', () => {
            it('DELETE: status 204', () => {
                return request(app)
                    .delete('/api/comments/1')
                    .expect(204)
            });
            it('DELETE: status 404, trying to delete comment which does not exists', () => {
                return request(app)
                    .delete('/api/comments/9999')
                    .expect(404)
            });
            it('DELETE: status 400, invalid type of comment it, ie string', () => {
                return request(app)
                    .delete('/api/comments/not-a-valid-id')
                    .expect(400)
            })
        })
        describe('GET /api', () => {
            it('GET: status 200, responds with JSON describing all the available endpoints', () => {
                return request(app)
                    .get('/api')
                    .send(jsonEndpoints)
                    .expect(200)
                    .then(({body}) => {
                        expect(body['GET /api/topics']).to.contain.keys('description', 'queries', 'example_response');
                    })
            })
        })
    })
})