
exports.up = function(knex) {
  return knex.schema.createTable('questions',function(table){
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.integer('likes').notNullable();
    table.integer('users_id').unsigned();
    table.foreign('users_id').references('users.id')

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('questions');
};
