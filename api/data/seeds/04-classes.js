exports.seed = function(knex) {
  return knex('classes').del()
    .then(function () {
      return knex('classes').insert([
        {class_id: 1, name: 'boxing', type: 'cardio', date: 'Monday, July 26th', start_time: '7:00 am', duration: '60 minutes', intensity_level: 'medium', location: 'park', number_registered: '0', max_size: '20', user_id: '1'},
        {class_id: 2, name: 'kettlebells', type: 'strength', date: 'Monday, July 26th', start_time: '8:00 am', duration: '30 minutes', intensity_level: 'high', location: 'video', number_registered: '0', max_size: '30', user_id: '1'},
      ]);
    });
};
