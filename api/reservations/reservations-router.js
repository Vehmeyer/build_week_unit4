const router = require('express').Router();
const Reservations = require('./reservations-model');

router.get('/', (res, req, next) => {
    try {
        console.log("GET all connected")
    } catch (err) {
        next(err)
    }
})

router.get('/:user_id', (res, req, next) => {
    try {
        console.log("GET by id connected")
    } catch (err) {
        next(err)
    }
})

router.post('/:user_id', (res, req, next) => {
    try {
        console.log("POST connected")
    } catch (err) {
        next(err)
    }
})

router.delete('/:user_id', (res, req, next) => {
    try {
        console.log("DELETE connected")
    } catch (err) {
        next(err)
    }
})


module.exports = router;