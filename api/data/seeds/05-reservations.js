exports.seed = function(knex) {
  return knex('reservations').del()
    .then(function () {
      return knex('reservations').insert([
        {reservation_id: 1, class_id: 1, user_id: 1},
        {reservation_id: 2, class_id: 2, user_id: 1},
      ]);
    });
};
