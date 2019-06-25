const userRouter = require('express').Router();
const { sendUser } = require('../controllers/user-controllers')

userRouter.route('/').get(sendUser)
userRouter.route('/:username').get(sendUser)

module.exports = userRouter;