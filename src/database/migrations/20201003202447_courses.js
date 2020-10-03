
exports.up = function(knex) {
  knex.schema.createTable('courses',function(table){
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.string('author').notNullable();
    table.string('link').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('courses')
};
