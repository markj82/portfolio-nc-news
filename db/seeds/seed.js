const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../index.js');

const { formatDate, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(knex, Promise) {
  return knex.migrate
      .rollback()
      .then(()=> {
        return knex.migrate.latest()
      })
      .then(() => {
        const topicsInsertions = knex('topics').insert(topicData).returning('*')
        const usersInsertions = knex('users').insert(userData).returning('*');
        return Promise.all([topicsInsertions, usersInsertions])
      })
      .then(() => {
        return knex
          .insert(formatDate(articleData))
          .into('articles')
          .returning('*')
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      return knex('comments').insert(formattedComments);
    });
};