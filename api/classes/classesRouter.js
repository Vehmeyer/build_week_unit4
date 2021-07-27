// REFERENCED NODE-API3-PROJECT WEEK 1 DAY 3

const express = require('express')
const router = express.Router()
const Class = require("./classesModel")
const {
  validateUserId,
  validateClassPayload,
  validatePost} = require("../middleware/classesMiddleware")


router.get("/api/classes", (req, res, next) => {
  Class.find()
  .then(classes => {
    res.json(classes)
  })
  .catch(next)
})

router.get("/api/classes/:id", (req, res, next) => {
  Class.findById()
  .then(classes => {
    res.json(classes)
  })
  .catch(next)
})

router.post("/api/classes", validateClassPayload, validateUserId, async (req, res, next) => {
  try {
    const result = await Class.insert({
      name: req.name,
      type: req.type,
      date: req.date,
      start_time: req.start_time,
      duration: req.duration,
      intensity_level: req.intensity_level,
      location: req.location,
      number_registered: req.number_registered,
      max_size: req.max_size,
      user_id: req.user_id
    })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

router.put("/api/classes/:id", (req, res, next) => {
  Class.update(req.body.id)
    .then(() => {
      return Class.getById(req.body.id)
    })
    .then(classes => {
      res.json(classes)
    })
    .catch(next)
})

router.delete("/api/classes/:id", async (req, res, next) => {
  try {
    await Class.remove(req.body.id)
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
