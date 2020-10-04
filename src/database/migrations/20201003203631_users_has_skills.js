
exports.up = function(knex) {
    return knex.schema.createTable('user_has_skills',function(table){
      table.integer('users_id').unsigned();
      table.integer('skills_id').unsigned();
      table.foreign('users_id').references('users.id')
      table.foreign('skills_id').references('skills.id')


      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_has_skills');
};
