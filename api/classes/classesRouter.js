// REFERENCED NODE-API3-PROJECT WEEK 1 DAY 3

const express = require('express')
const router = express.Router()
const Class = require("./classesModel")


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

router.post("/api/classes", (req, res, next) => {
  const { username, password } = req.body
  if(!username || !password) {
    res.status(401).json({message:"username and password required"})
  } else {
    Class.add({username, password})
    .then(newUser => {
      res.status(201).json({message: `Welcome, ${newUser.username}`})
    })
    .catch(next)   
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



router.post("/api/classes/:id", async (req, res, next) => {
  try{
    const posts = await Class.timeUpdate(req.params.id)
    res.json(posts)
  }catch(e){
  res.status(500).json(e.message)  
  next()
  }}
)


router.delete("/api/classes/:id", async (req, res, next) => {
  try{ 
  const time = await  Class.timeRemove( req.params.id)
  res.json(time)
  }catch(e){
  res.status(401).json(e.message)
  }
})








module.exports = router
