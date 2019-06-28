const topicRouter = require('express').Router();
const { sendTopics } = require('../controllers/topic-controllers')
const { handleMethodErrors} = require('../errors/index')

topicRouter
    .route('/')
    .get(sendTopics)
    .all(handleMethodErrors)

module.exports = topicRouter;