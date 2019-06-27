const { fetchArticle, editArticle, addCommentToArticle, fetchComments } = require('../models/article-model')

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
    }).catch(next)
}

exports.addComment = (req, res, next) => {
    const article_id = req.params.article_id
    const username = req.body.username
    const commentBody = req.body.body
    addCommentToArticle(article_id, username, commentBody).then(comment => {
        res.status(201).send({comment})
    })
}

exports.sendComment = (req, res, next) => {
    const article_id = req.params.article_id
    fetchComments(article_id).then(comments => {
        res.status(200).send({comments})
    })
}