const router = require('express').Router();
const bcrypt = require('bcryptjs');
const tokenBuilder = require('./token-builder');
const Users = require('../users/users-model');
const {
    checkPayload,
    uniqueUsername,
    checkLoginPayload,
} = require('../middleware/authentication-middleware')


router.post('/register', (req, res, next) => {
    // add middleware - 1 - check payload,  2- unique username

    // console.log("POST - REGISTER end point connected")
    // next()

    const { username, password, role_name } = req.body

    const hash = bcrypt.hashSync(password, 8)

    Users.add({ username, password: hash, role_name })
        .then(newUser => {
            res.status(200).json(newUser) // expand on .json message?
        })
        .catch(next) 
})

router.post('/login', checkPayload, checkLoginPayload, async (req, res, next) => {
     try {
        const { username, password } = req.body
        const user = await Users.findByUsername(username)

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = tokenBuilder(user)
            res.status(200).json({
                message: `welcome, ${username}`,
                token
            })
            } else {
                next({ status:401, message: 'invalid credentials' })
            }
    } catch (err) {
        next(err)
    }
})

module.exports = router;