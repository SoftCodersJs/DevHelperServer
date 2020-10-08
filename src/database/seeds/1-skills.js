
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('skills').del()
    .then(function () {
      // Inserts seed entries
      return knex('skills').insert([
        {name:'Javascript', image:'/temp/Uploads/javascript.png'},
        {name:'Java', image:'/temp/Uploads/javapng.png'},
        {name:'Python', image:'/temp/Uploads/python.png'}
      ]);
    });
};
