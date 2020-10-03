
exports.up = function(knex) {
  knex.schema.createTable('questions_has_comments',function(table){
    table.integer('questions_id').unsigned();
    table.integer('comments_id').unsigned();
    table.foreign('questions_id').references('questions.id')
    table.foreign('comments_id').references('comments.id')


    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('questions_has_comments');
};
