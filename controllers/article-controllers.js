const { fetchArticle, editArticle } = require('../models/article-model')

exports.sendArticle = (req, res, next) => {
    const article_id = req.params.article_id
    fetchArticle(article_id).then(article => {
        res.status(200).send({article})
    }).catch(next)
}

exports.amendArticle = (req, res, next) => {
    const article_id = req.params.article_id
    const increment = req.body.inc_votes
    editArticle(article_id, increment).then(([article]) => {
        res.status(201).send({article})
    })
}