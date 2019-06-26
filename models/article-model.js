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
            return article
        })
    }