const articleRouter = require('express').Router();
const { sendArticle, amendArticle } = require('../controllers/article-controllers');

articleRouter.route('/').get(sendArticle)

articleRouter
    .route('/:article_id')
    .get(sendArticle)
    .patch(amendArticle)

module.exports = articleRouter;