const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const db = require('./data/db-config')

// IMPORT ROUTERS
const authRouter = require('./authentication/authentication-router');
// const usersRouter = require('');
// const classesRouter = require('');
// const reservationsRouter = require('');

// CLEAN UP/REMOVE
function getAllUsers() { return db('users') }

// CLEAN UP/REMOVE
// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())
// server.use(cors({
//   origin: '*'
// }))

// LIST ROUTES
server.use('/', authRouter);
// server.use('/users', usersRouter);
// server.use('/classes', classesRouter);
// server.use('/reservations', reservationsRouter);

// CLEAN UP/REMOVE
server.get('/api/users', async (req, res) => {
  res.json(await getAllUsers())
})

// CLEAN UP/REMOVE
// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
  })
})

module.exports = server
