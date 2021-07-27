const Users = require('../users/users-model');

const checkPayload = (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            res.status(404).json({message: 'username and password required'})
        } else {
            req.username = username
            req.password = password
            next()
        }
    } catch (err) {
        next(err)
    }
}

const uniqueUsername = async (req, res, next) => {
    try {
        const existingUsername = await Users.findByUsername(req.body.username)
        if (!existingUsername) {
            next()
        } else {
            next({ status: 401, message: 'username taken' })
        }
    } catch (err) {
        next(err)
    }
}

const checkLoginPayload = async (req, res, next) => {
    try {
        const user = await Users.findByUsername(req.body.username)
        const password = await Users.validatePassword(req.body.password)
        if (!user || !password) {
            next({ status: 404, message: 'invalid credentials' })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

const convertRoleNameToId = (req, res, next) => {
    if (!req.body.role_name) {
        next({ status: 404, message: 'role required' })
    } else {
        if (req.body.role_name.toLowerCase() === 'instructor') {
            req.body = {
                username: req.body.username,
                password: req.body.password,
                role_id: 1, 
            }
            next()
        } else if (req.body.role_name.toLowerCase() === 'client') {
                req.body = {
                    username: req.body.username,
                    password: req.body.password,
                    role_id: 2, 
                }
            next()
        }
    }
}

module.exports = {
    checkPayload,
    uniqueUsername,
    checkLoginPayload,
    convertRoleNameToId,
};