const commentRouter = require('express').Router();
const { amendComment, removeComment } = require('../controllers/comment-controllers');
const { handleMethodErrors} = require('../errors/index')

commentRouter
    .route('/:comment_id')
    .patch(amendComment)
    .delete(removeComment)
    .all(handleMethodErrors)

module.exports = commentRouter;