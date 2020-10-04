
exports.up = function(knex) {
  return knex.schema.createTable('users',function(table){
    table.increments('id').primary();
    table.string('cpf').notNullable();
    table.decimal('score', 10, 2).notNullable();
    table.text('description');
    table.string('location');
    table.string('email').notNullable().unique();
    table.string('password').notNullable().unique();
    table.string('phone');
    table.string('github');

    table.text('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
