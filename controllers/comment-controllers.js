const { editComment } = require('../models/comment-model')

exports.amendComment = (req, res, next) => {
    const comment_id = req.params.comment_id
    const votes = req.body.inc_votes
    editComment(comment_id, votes).then(comments => {
        res.status(201).send({comments})
    }).catch(next)
}