
exports.up = function(knex) {
  knex.schema.createTable('skills',function(table){
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('image');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('skills');
};
