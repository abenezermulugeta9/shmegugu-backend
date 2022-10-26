const Projects = require("../models/projectSchema");
const mongoose = require("mongoose");
const { ObjectID } = require("bson");
const { uploadImage } = require("./imagesController");

const geocoder = require("../utils/geoCoder");

module.exports.getProjects = async (req, res, next) => {
  const projects = await Projects.find().exec();

  res.status(200).json(projects);
};

module.exports.getProjectByTitle = async (req, res, next) => {
  const project = await Projects.find({
    title: req.params.project_title,
  }).exec();
  res.status(200).json(project);
};

module.exports.getProjectById = async (req, res, next) => {
  const project = await Projects.find({
    _id: req.params.id,
  }).exec();
  res.status(200).json(project);
};

module.exports.addProjects = async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    res.status(400).json({ error: "Invalid request body" });
  else {
    let { body } = req;
    const loc = await geocoder.geocode(body.address);
    const location = [loc[0].latitude, loc[0].longitude];
    body = { ...body, location };

    let project = new Projects(body);

    try {
      let result = await project.save();
      console.log("after save");
      res.status(201).send({ success: result });
    } catch (error) {
      console.log(error.message);
      return next(error);
    }
  }
};

module.exports.updateProjects = async (req, res, next) => {
  if (Object.keys(req.body).length === 0)
    res.status(400).json({ error: "Invalid request body" });
  else {
    const {title, description, imageUrl,goal,minimum_stake,
      category,stage, funding_type, owners,applications,location
    } = req.body;
    let project = {
      title,  description, imageUrl,goal,minimum_stake, category,
      stage,funding_type, owners,applications,location};

    try {
      const data = await Projects.updateOne(
        { _id: ObjectID(req.params.project_id) },
        { $set: project }
      );
      if (data.matchedCount > 0) {
        return res.status(200).send({ success: true });
      }

      res.status(500).send("Project not found!");
    } catch (err) {
      return next(err);
    }
  }
};

module.exports.removeProject = async (req, res, next) => {
  const data = await Projects.deleteOne({
    _id: ObjectID(req.params.project_id),
  });

  if (data.matchedCount > 0) {
    return res.status(200).send({ success: true });
  }

  res.status(500).send("Project not found!");
};
