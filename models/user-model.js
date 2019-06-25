const connection = require('../db/connection');

exports.fetchUser = username => {
    return connection
        .first('*')
        .from('users')
        .where('username', username)
        .then(user => {
            if(!user) {
                return Promise.reject({
                    status: 404,
                    msg: `User not found`
                })
            } else return user;
        })
}