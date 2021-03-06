
exports.up = function(connection, Promise) {
  return connection.schema.createTable('topics', function(topicsTable) {
    topicsTable.string('slug').primary().notNullable();
    topicsTable.string('description').notNullable();
  })
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable('topics');
};