const Class = require("../classes/classesModel");

async function validateUserId(req, res, next) {
  try {
    const user = await Class.getById(req.body.user_id);
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
}

function validateClassPayload(req, res, next) {
  const { name,
    type,
    date,
    start_time,
    duration,
    intensity_level,
    location,
    number_registered,
    max_size,
    user_id } = req.body

  if (!name || !type || !date || !start_time || !duration || !intensity_level || !location || !number_registered || !max_size || !user_id) {
    res.status(401).json({message: "Make sure all fields are filled out"})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text || text.trim()) {
    res.status(400).json({message: "missing required text field"})
  } else {
    req.text = text.trim();
    next();
  }
};

module.exports = {
  validateUserId,
  validateClassPayload,
  validatePost,
};
