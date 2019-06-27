const commentRouter = require('express').Router();
const { amendComment, removeComment } = require('../controllers/comment-controllers');

commentRouter.route('/:comment_id').patch(amendComment).delete(removeComment)

module.exports = commentRouter;