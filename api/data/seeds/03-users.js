exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {user_id: 1, username: 'instructor@aol.com', password: '$2y$08$gOlLSbDR.QKr7s7RJMou..awGRWJ2BRAb68tqqn3AYGAmFVLMThCO', role_id: 1},
        {user_id: 2, username: 'client@aol.com', password: '$2y$08$j.3wRCGiscAV6hAHk6zxlussBekF1b1gdGWcbUsfGwQ/jg74vPdL6', role_id: 2},
      ]);
    });
};
