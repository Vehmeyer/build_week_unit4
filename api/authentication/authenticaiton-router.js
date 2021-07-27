const router = require('express').Router();
const bcrypt = require('bcryptjs');
const tokenBuilder = require('./token-builder');
// build and import users model
// build and import middleware

router.post('/register', (req, res, next) => {
    // middleware - 1 - check payload,  2- unique username

    // const { username, password, role_name } = req.body

    // const hash = bcrypt.hashSync(password, 8)

    // Users.add({ username, password: hash, role_name } => {
    //     .then(newUser => {
    //         res.status(200).json(newUser)
    //       })
    //       .catch(next) 
    // })

    console.log("POST - REGISTER end point connected")
    next()
})
router.post('/login', (req, res, next) => {
    // middleware - 1 - check payload,  2- check login payload - for matching credentials

    // const { username, password } = req.body
  
    // Users.findByUsername(username)
    // .then(([user]) => {
    // if (user && bcrypt.compareSync(password, user.password)) {
    //     const token = tokenBuilder(user)
    //     res.status(200).json({
    //     message: `welcome, ${username}`,
    //     token
    //     })
    //     } else {
    //     next({ status:401, message: 'invalid credentials' })
    //     }
    // })
    // .catch(next)

    console.log("POST - LOGIN end point connected")
    next()
})

module.exports = router;