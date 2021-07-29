const Users = require('../users/users-model');

async function verifyUserId (res, req, next) {
    try {
        const user = await Users.findById(req.params.id)
        if (!user) {
            res.status(404).json({message: `user id ${req.params.id} doesn't exist`})
        } else {
            req.user = user
            next()
            }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    verifyUserId
}