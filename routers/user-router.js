const userRouter = require('express').Router();
const { sendUser } = require('../controllers/user-controllers')
const { handleMethodErrors} = require('../errors/index')

userRouter
    .route('/')
    .get(sendUser)
    .all(handleMethodErrors)

userRouter
    .route('/:username')
    .get(sendUser)
    .all(handleMethodErrors)

module.exports = userRouter;