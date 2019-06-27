const commentRouter = require('express').Router();
const { amendComment } = require('../controllers/comment-controllers');

commentRouter.route('/:comment_id').patch(amendComment)

module.exports = commentRouter;