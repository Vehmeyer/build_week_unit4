const router = require('express').Router();
const Users = require('./users-model');
const { verifyUserId } = require('../middleware/users-middleware');

router.get('/', async (req, res, next) => {
    try { 
        const allUsers = await Users.getUsers()
        res.status(200).json(allUsers)
    } catch (err) {
        next(err)
    }
})

router.get('/instructors', async (req, res, next) => {
    try { 
        const instructors = await Users.getInstructors()
        res.status(200).json(instructors)
    } catch (err) {
        next(err)
    }
})

router.get('/clients', async (req, res, next) => {
    try { 
        const clients = await Users.getClients()
        res.status(200).json(clients)
    } catch (err) {
        next(err)
    }
})

// // NEEDS TO BE TESTED
// router.get('/current', verifyUserId, async (req, res, next) => {
//     res.status(200).json(req.user)
//     next()
// })

// // NEEDS TO BE TESTED
// router.put('/:id', verifyUserId, async (req, res, next) => {
//     try { 
//         const updatedUser = await Users.update(req.params.id, req.body)
//         res.status(202).json(updatedUser)
//     } catch (err) {
//         next(err)
//     }
// })

// NEEDS TO BE TESTED
// router.delete('/:id', verifyUserId, async (req, res, next) => {
//     try { 
//         await Users.remove(req.params.id)
//         res.status(200).json(req.user)
//     } catch (err) {
//         next(err)
//     }
// })

module.exports = router;