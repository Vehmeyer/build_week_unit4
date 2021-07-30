const db = require('../data/db-config');
// const { findById } = require('../users/users-model');

function get() {
  return db('classes');
}

function getById(class_id) {
  return db('classes')
    .where({ class_id })
    .first();
}


async function insert(classes) {
  const [class_id] = await db('classes')
  .insert(classes)
  return get().where({class_id}).first(0)
  // return db('classes')
  //   .insert(classes)
  //   .then(class_id => {
  //     return getById(class_id[0]);
  //   });
}

function update(class_id, changes) {
  return db('classes')
    .where({ class_id })
    .update(changes)
    .then(() => {
      return getById(class_id);
    });
}

function remove(class_id) {
  return db('classes')
    .where('id', class_id)
    .del();
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};