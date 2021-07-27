const db = require('../data/db-config');

function getUsers() {
    return db('users as u')
        .join('roles as r', 'u.role_id', 'r.role_id')
        .select('u.user_id', 'u.username', 'r.role_name')
}   

function getClients() {
    return db('users as u')
        .join('roles as r', 'u.role_id', 'r.role_id')
        .where('u.role_id', 2)
        .select('u.user_id', 'u.username', 'r.role_name')
}

function getInstructors() {
    return db('users as u')
        .join('roles as r', 'u.role_id', 'r.role_id')
        .where('u.role_id', 1)
        .select('u.user_id', 'u.username', 'r.role_name')
}
    
function findById(user_id) {
    return db('users as u')
        .join('roles as r', 'u.role_id', 'r.role_id')
        .where('user_id', user_id)
        .select('u.user_id', 'u.username', 'r.role_name')
        .first()
}

function findByUsername(username) {
    return db('users as u')
        .where('username', username)
        .join('roles as r', 'u.role_id', 'r.role_id')
        .select('u.user_id', 'u.username', 'u.password', 'r.role_name')
        .first()
}

function validatePassword(password) {
    return db('users')
        .where('password', password)
}

async function add(user) {
    await db('users').insert(user)
    return db('users as u')
        .where('username', user.username)
        .join('roles as r', 'u.role_id', 'r.role_id')
        .select('u.user_id', 'u.username', 'r.role_name')

    // const id = await db('users as u').insert(user)
    // return findById(id)
}

async function remove(user_id) {
    const deletedUser = await findById(user_id)
    await db('users as u')
        .where('user_id', user_id)
        .delete()
    return deletedUser
}

module.exports = {
    getUsers,
    getClients,
    getInstructors,
    findById,
    findByUsername,
    validatePassword,
    add,
    remove,
};