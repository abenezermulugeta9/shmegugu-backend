module.exports = function (req, res, next) {
  const {
    title,
    description,
    goal,
    minimum_stake,
    category,
    stage,
    funding_type,
    owners,
    applications,
    location,
  } = req.body;

  if (
    !title ||
    !description ||
    goal ||
    owners ||
    !minimum_stake ||
    !category ||
    !stage ||
    !funding_type ||
    !applications||
    location||
    !req.file
  ) {
    throw new Error("Invalid request body");
  }

  next();
};