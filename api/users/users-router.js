const router = require('express').Router();
const Users = require('./users-model');
const { verifyUserId } = require('../middleware/users-middleware');
// const restricted = require('../middleware/restricted-middleware'); 
// -- use cases where this is needed?

// import user middleware

// plug in middleware
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

router.get('/current', verifyUserId, async (req, res, next) => {
    // console.log("GET current user connected")
    // CONNECTION TEST SUCCESSFUL
    res.status(200).json(req.user)
    next()
})

// // GET current user?

// router.put('/:id', async (req, res, next) => {
//     // console.log("PUT request connected")
//     // CONNECTION TEST SUCCESSFUL

//     // try { 

//     // } catch (err) {
//     //     next(err)
//     // }
// })

// router.delete('/:id', verifyUserId, async (req, res, next) => {
//     try { 
//         await Users.remove(req.params.id)
//         res.status(200).json(req.user)
//     } catch (err) {
//         next(err)
//     }
// })

module.exports = router;