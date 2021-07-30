const express = require('express')
const router = express.Router()
const Class = require("./classesModel")
const {
  validateClassPayload} = require("../middleware/classesMiddleware")


router.get("/", (req, res, next) => {
  Class.get()
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

router.post("/", /*validateClassPayload*/(req, res, next) => {
  console.log('here')
  const {name, type, date, start_time, duration, intensity_level, location, number_registered, max_size} = req.body
  Class.insert({name, type, date, start_time, duration, intensity_level, location, number_registered, max_size})
    .then(({class_id}) => {
      return Class.findById(class_id)
    })
    .then(classes => {
      res.status(201).json(classes)
    })
    .catch(next)
})

router.put("/:id", (req, res, next) => {
  Class.update(req.params.class_id, {...req.changes})
    .then(() => {
      return Class.getById(req.params.class_id)
    })
    .then(classes => {
      res.json(classes)
    })
    .catch(next)
})

router.delete("/:id", async (req, res, next) => {
  try {
    await Class.remove(req.params.class_id)
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
