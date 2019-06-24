
exports.up = function(connection, Promise) {
    return connection.schema.createTable('articles',function(articlesTable) {
        articlesTable.increments('article_id').primary().notNullable();
        articlesTable.string('title').notNullable();
        articlesTable.string('body').notNullable();
        articlesTable.integer('votes'); // set default to 0 later
        articlesTable.string('topic').references('topics.slug');
        articlesTable.string('author').references('users.username').notNullable();
        articlesTable.string('created_at') // timestamp
  
    })
  };
  
  exports.down = function(connection, Promise) {
      return connection.schema.dropTable('articles');
  };