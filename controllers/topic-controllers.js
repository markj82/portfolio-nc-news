const { fetchTopics } = require('../models/topic-model');

exports.sendTopics = (req, res, next) => {
    fetchTopics().then(topics => {
        res.status(200).send({topics})
    })
}