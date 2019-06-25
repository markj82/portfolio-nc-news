const articleRouter = require('express').Router();
const { sendArticle } = require('../controllers/article-controllers');

articleRouter.route('/').get(sendArticle)
articleRouter.route('/:article_id').get(sendArticle) // add .patch later

module.exports = articleRouter;