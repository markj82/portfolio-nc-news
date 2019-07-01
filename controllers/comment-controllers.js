const { editComment, deleteComment } = require('../models/comment-model')

exports.amendComment = (req, res, next) => {
    const comment_id = req.params.comment_id
    const votes = req.body.inc_votes
    editComment(comment_id, votes).then(comments => {
        if(!comments) {
            return Promise.reject({
                status: 404,
                msg: 'Nothing to edit'
            })
        } else res.status(200).send({comments})
        
    }).catch(next)
}

exports.removeComment = (req, res, next) => {
    const comment_id = req.params.comment_id
    deleteComment(comment_id).then(comment => {
        if (comment === 0) {
            return Promise.reject({
                status: 404,
                msg: 'Nothing to delete'
            })
        } else res.status(204).send("deleted")
        
    }).catch(next)
}