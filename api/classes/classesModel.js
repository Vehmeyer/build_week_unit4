const db = require('../data/db-config');

function get() {
  return db('classes');
}

function getById(class_id) {
  return db('classes')
    .where({ class_id })
    .first();
}


function insert(classes) {
  return db('classes')
    .insert(classes)
    .then(class_id => {
      return class_id;
      //return getById(parseInt(class_id));
    });
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