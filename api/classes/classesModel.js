// COPY AND PASTED FROM NODE-API3-PROJECT WEEK 1 DAY 3

const db = require('../data/db-config');



function get() {
  return db('users');
}

function getById(id) {
  return db('users')
    .where({ id })
    .first();
}



function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(() => {
      return getById(id);
    });
}

function remove(id) {
  return db('classes')
    .where('id', id)
    .del();
}


function timeAdd(classes, id){
return db("clasess",id)
.where("start_time")
.insert("start_time")
}


function timeUpdate(classes ,id){
return db("classes",  id)
.where("start_time")
.update({
  status: 'archived',
  thisKeyIsSkipped: undefined
})





function timeRemove(classes , id){
  return db("classes", id)
  .where("start_time")
  .del()
  }

  




module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  timeUpdate,
  timeRemove,
  timeAdd,
};