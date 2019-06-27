const connection = require('../db/connection');

exports.editComment = (comment_id, votes) => {
    return connection
        .first('*')
        .from('comments')
        .where('comments.comment_id', comment_id)
        .increment("votes", votes)
        .returning('*')
        .then(([comment]) => comment)
}

exports.deleteComment = comment_id => {
    return connection
        .select('*')
        .from('comments')
        .where('comments.comment_id', comment_id)
        .delete()
}