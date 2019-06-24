
exports.up = function(connection, Promise) {
  return connection.schema.createTable('comments', function(commentsTable) {
      commentsTable.increments('comment_id').primary();
      commentsTable.string('author').references('users.username');
      commentsTable.integer('article_id').references('articles.article_id');
      commentsTable.integer('votes'); // set to 0 ?
      commentsTable.integer('created_at');
      commentsTable.string('body')
  })
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable('comments');
};
