const articleRouter = require('express').Router();
const { sendArticle, amendArticle, addComment, sendComment, sendManyArticles } = require('../controllers/article-controllers');
const { handleMethodErrors} = require('../errors/index')

articleRouter
    .route('/')
    .get(sendManyArticles)
    .all(handleMethodErrors)

articleRouter
    .route('/:article_id')
    .get(sendArticle)
    .patch(amendArticle)
    .all(handleMethodErrors)

articleRouter
    .route('/:article_id/comments')
    .post(addComment)
    .get(sendComment)
    .all(handleMethodErrors)


module.exports = articleRouter;