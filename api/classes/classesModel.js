// COPY AND PASTED FROM NODE-API3-PROJECT WEEK 1 DAY 3

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
    .then(ids => {
      return getById(ids[0]);
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