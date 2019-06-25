const { fetchArticle } = require('../models/article-model')

exports.sendArticle = (req, res, next) => {
    fetchArticle(res.sendStatus(200))
}