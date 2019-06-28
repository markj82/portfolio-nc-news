const { fetchArticle, editArticle, addCommentToArticle, fetchComments, fetchManyArticles } = require('../models/article-model')

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
        if(!increment) {
            return Promise.reject({
                status: 400,
                msg: 'no body to send'
            })
        }
        res.status(200).send({article})
    }).catch(next)
}

exports.addComment = (req, res, next) => {
    const article_id = req.params.article_id
    const username = req.body.username
    const commentBody = req.body.body
    addCommentToArticle(article_id, username, commentBody).then(comment => {
        res.status(201).send({comment})
    }).catch(next)
}

exports.sendComment = (req, res, next) => {
    const article_id = req.params.article_id
    const {sort_by, order} = req.query
    // console.log(article_id, 'article id from contrller')
    fetchComments(article_id, sort_by, order).then(comments => {
        // if (comments.length === 0) {

        // }
        res.status(200).send({comments})
    }).catch(next)
}

exports.sendManyArticles = (req, res, next) => {
    const { sort_by, order, author, topic } = req.query;
   fetchManyArticles(sort_by, order, author, topic).then(articles => {
       res.status(200).send({articles})
   }).catch(next)
}