
exports.up = function(knex) {
  knex.schema.createTable('questions',function(table){
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content').notNullable().unique();
    table.integer('likes').notNullable();
    table.string('users_id').unsigned();
    table.foreign('users_id').references('users.id')

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('questions');
};
