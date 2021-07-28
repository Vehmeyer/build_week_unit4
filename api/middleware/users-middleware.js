const Users = require('../users/users-model');

const verifyUserId = async (res, req, next) => {
    const user = await Users.findById(req.params.id)
    if (!user) {
        next({
            status: 404,
            message: `user id ${req.params.id} doesn't exist`
        })
    } else {
        req.user = user
        next()
    }
}

module.exports = {
    verifyUserId
}