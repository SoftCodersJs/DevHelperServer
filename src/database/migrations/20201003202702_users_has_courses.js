
exports.up = function(knex) {
  knex.schema.createTable('users_has_courses',function(table){
    table.integer('users_id').unsigned();
    table.integer('courses_id').unsigned();
    table.foreign('users_id').references('users.id')
    table.foreign('courses_id').references('courses.id')


    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('users_has_courses');
};
