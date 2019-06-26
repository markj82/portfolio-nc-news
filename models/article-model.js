const connection = require('../db/connection');

exports.fetchArticle = article_id => {
    return connection
        .first('articles.*')
        .count({comment_count: "comment_id"})
        .from('articles')
        .leftJoin("comments", "comments.article_id", "articles.article_id")
        .groupBy("articles.article_id")
        .where("articles.article_id", article_id)
        .then(article => {
            if(!article) {
                return Promise.reject({
                    status: 404,
                    msg: "Article not found"
                })
            } else return article
        })
    }

exports.editArticle = (article_id, increment) => {
    return connection
        .first('*')
        .from('articles')
        .where("articles.article_id", article_id)
        .increment("votes", increment)
        .returning('*')
        .then(article => {
            if(article.length === 0) {
                return Promise.reject({
                    status: 404,
                    msg: "Article not found"
                })
            } else return article
        })
}

exports.addCommentToArticle = (article_id, username, commentBody) => {
    const commentToInsert = {
        article_id: article_id,
        author: username,
        body: commentBody
    }

    return connection
        .from('comments')
        .insert(commentToInsert)
        .returning('*')
        .then(comment => {
            return comment[0]
        })
}