const Class = require("../classes/classesModel");

async function validateUserId(req, res, next) {
  try {
    const user = await Class.getById(req.params.id);
    if (!user) {
      next({status: 404, message: "user not found"});
    } else {
      req.user = user;
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding user"
    })
  }

};

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name || name.trim()) {
    res.status(400).json({message: "missing required name field"})
  } else {
    req.name = name.trim();
    next();
  }
};

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || text.trim()) {
    res.status(400).json({message: "missing required text field"})
  } else {
    req.text = text.trim();
    next();
  }
};

// request time
function requestTime(req,res, next)
const {time} = req.body;
if (!time){
  next({ status: 404, message: " schedule time does not exist " })
  }
  else{
    req.time = time
    next()
}

/// delete time
function deleteTime(req, res, next) {
  const {time} = req.body;
  if(time){
next({status: 200, message:" Time has been deleted"})
  } else{
  req.time = time;
  next()
}
}






module.exports = {
  validateUserId,
  validateUser,
  validatePost,
};
