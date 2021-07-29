const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./authentication/authentication-router');
const usersRouter = require('./users/users-router');
const classesRouter = require('./classes/classesRouter');
const reservationsRouter = require('./reservations/reservations-router');

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors({
  origin: '*'
}))

server.use('/', authRouter);
server.use('/users', usersRouter);
server.use('/classes', classesRouter);
server.use('/reservations', reservationsRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
  })
})

module.exports = server
