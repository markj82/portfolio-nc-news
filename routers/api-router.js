const express = require('express');
const apiRouter = express();

const topicRouter = require('./topic-router')
const userRouter = require('./user-router')

apiRouter.use('/topics', topicRouter)
apiRouter.use('/users', userRouter)

module.exports = apiRouter