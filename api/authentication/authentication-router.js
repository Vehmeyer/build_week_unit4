const router = require('express').Router();
const bcrypt = require('bcryptjs');
const tokenBuilder = require('./token-builder');
const Users = require('../users/users-model');
const {
    checkPayload,
    uniqueUsername,
    checkLoginPayload,
    convertRoleNameToId,
} = require('../middleware/authentication-middleware')


router.post('/register', checkPayload, uniqueUsername, convertRoleNameToId, async (req, res, next) => {
    try {
        let user = req.body
        const hash = bcrypt.hashSync(user.password, 8)
        user.password = hash

        const newUser = await Users.add(req.body)
        
        const token = tokenBuilder(newUser)
        res.status(201).json({user: newUser, token})
    } catch (err) {
        next(err)
    }
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