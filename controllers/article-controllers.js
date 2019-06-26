const { fetchArticle } = require('../models/article-model')

exports.sendArticle = (req, res, next) => {
    const article_id = req.params.article_id
    // console.log(article_id)
    fetchArticle(article_id).then(article => {
        res.status(200).send({article})
    }).catch(next)
}