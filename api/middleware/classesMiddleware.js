const Class = require("../classes/classesModel");

async function validateClassId(req, res, next) {
  try {
    const classes = await Class.getById(req.body);
    if (!classes) {
      next({status: 404, message: "class not found"});
    } else {
      req.classes = classes;
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: "problem finding classes"
    })
  }
}

function validateClassPayload(req, res, next) {
  const {
    name,
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


module.exports = {
  validateClassId,
  validateClassPayload,
};
