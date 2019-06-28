const express = require('express');
const apiRouter = express();
const { handleMethodErrors} = require('../errors/index')

const topicRouter = require('./topic-router')
const userRouter = require('./user-router')
const articleRouter = require('./article-router')
const commentRouter = require('./comment-router')

const jsonEndpoints = require('../endpoints.json')

apiRouter.route('/')
    .get((req, res) => res.status(200).send(jsonEndpoints))
    .all(handleMethodErrors)

apiRouter.use('/topics', topicRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/articles', articleRouter)
apiRouter.use('/comments', commentRouter)

module.exports = apiRouter