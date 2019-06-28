
exports.handleCustomErrors = (err, req, res, next) => {
    // console.log(err, '<< err from index.js errors')
    if (err.status) res.status(err.status).send({ msg: err.msg });
    else next(err);
};
  
exports.handlePsqlErrors = (err, req, res, next) => {
    // console.log(err, '<< err from index.js errors')
    const sqlErrorCodes = {
        '22P02': 'Invalid id',
        '23502': 'Missing Required Information',
        '42703': 'invalid sort_by query'
    };
    if(sqlErrorCodes.hasOwnProperty(err.code)) {
        res.status(400).send({ msg: sqlErrorCodes[err.code]})
    }
    else next(err);
}; 

exports.routeNotFoundError = (req, res, next) => {
    // console.log(err, '<< err from index.js errors')
    res.status(404).send({ msg: 'Not Found!' })
}

exports.handleMethodErrors = (req, res, next) => {
    // console.log(err, '<< err from index.js errors')
    res.status(405).send({msg: 'Method Not Allowed'})
}

exports.handleServerErrors = (err, req, res, next) => {

    // console.log(err, '<< err from index.js errors')
    res.status(500).send({ msg: 'Internal Server Error' });
};
