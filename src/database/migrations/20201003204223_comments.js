
exports.up = function(knex) {
  knex.schema.createTable('comments',function(table){
    table.increments('id').primary();
    table.string('comment').notNullable();
    
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('comments');
};
