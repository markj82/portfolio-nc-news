const articleRouter = require('express').Router();
const { sendArticle, amendArticle, addComment, sendComment, sendManyArticles } = require('../controllers/article-controllers');

articleRouter.route('/').get(sendManyArticles)

articleRouter
    .route('/:article_id')
    .get(sendArticle)
    .patch(amendArticle)

articleRouter
    .route('/:article_id/comments')
    .post(addComment)
    .get(sendComment)


module.exports = articleRouter;