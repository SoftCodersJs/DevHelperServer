
exports.up = function(knex) {
  return knex.schema.createTable('questions_has_skills',function(table){
    table.integer('questions_id').unsigned();
    table.integer('skills_id').unsigned();
    table.foreign('questions_id').references('questions.id')
    table.foreign('skills_id').references('skills.id')

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('questions_has_skills');
};
