const express = require('express')
const router = express.Router()
const Class = require("./classesModel")
// const {validateClassPayload} = require("../middleware/classesMiddleware")


router.get("/", (req, res, next) => {
  Class.get()
  .then(classes => {
    res.json(classes)
  })
  .catch(next)
})

router.get("/:id", (req, res, next) => {
  Class.findById(req.params.id)
  .then(classes => {
    res.json(classes)
  })
  .catch(next)
})

router.post("/", /*validateClassPayload*/ (req, res, next) => {
Class.insert({
    name: req.body.name,
    type: req.body.type,
    date: req.body.date,
    start_time: req.body.start_time,
    duration: req.body.duration,
    intensity_level: req.body.intensity_level,
    location: req.body.location,
    number_registered: req.body.number_registered,
    max_size: req.body.max_size,
    user_id: req.body.user_id
  }).then(result => {
    res.status(201).json(result)
  })
  .catch(next)
})

router.put("/:id", (req, res, next) => {
  Class.update(req.params.id, {...req.changes})
    .then(() => {
      return Class.getById(req.params.id)
    })
    .then(classes => {
      res.json(classes)
    })
    .catch(next)
})

router.delete("/:id", async (req, res, next) => {
  try {
    await Class.remove(req.params.id)
    res.json(req.classes)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router
