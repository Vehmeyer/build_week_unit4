exports.seed = function(knex) {
  return knex('roles').del()
    .then(function () {
      return knex('roles').insert([
        {role_id: 1, role_name: 'instructor'},
        {role_id: 2, role_name: 'client'},
      ]);
    });
};
