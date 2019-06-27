const express = require('express');
const app = express();
const apiRouter = require('./routers/api-router');

app.use(express.json());

app.use('/api', apiRouter);

app.use('/*', (req, res ) => {
    res.status(404).send({ msg: 'Page not found'})
})

app.use((err, req, res, next) => {
    // console.log(err, '<< err from app.js')
    const sqlErrorCodes = {
        '23502': 'No data provided!', 
        '22P02': 'Invalid id'
    };
    if(sqlErrorCodes.hasOwnProperty(err.code)) {
        res.status(400).send({ msg: sqlErrorCodes[err.code]})
    }
    res.status(404).send({msg : "Not found"})
})

module.exports = app;