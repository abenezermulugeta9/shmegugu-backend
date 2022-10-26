const Projects = require("../models/projectSchema");
const mongoose = require('mongoose');

module.exports.getNearbyProjects = (long, lat) => { 
  return new Promise(resolve => {
    const data = Projects.find({ location: { $near: [long, lat] }});
    resolve(data);
  });
}