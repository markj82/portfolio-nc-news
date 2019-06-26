const articleRouter = require('express').Router();
const { sendArticle, amendArticle, addComment, sendComment } = require('../controllers/article-controllers');

articleRouter.route('/').get(sendArticle)

articleRouter
    .route('/:article_id')
    .get(sendArticle)
    .patch(amendArticle)

articleRouter
    .route('/:article_id/comments')
    .post(addComment)
    .get(sendComment)

module.exports = articleRouter;