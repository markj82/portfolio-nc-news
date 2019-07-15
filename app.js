const express = require('express');
const cors = require ('cors');
const app = express();
const apiRouter = require('./routers/api-router');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./errors/index');

app.use(cors());

app.use(express.json());

app.use('/api', apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

app.use('/*', (req, res ) => {
    res.status(404).send({ msg: 'Page not found'})
})

module.exports = app;