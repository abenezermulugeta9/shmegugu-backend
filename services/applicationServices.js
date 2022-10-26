const { application } = require("express");
const { MongoNetworkTimeoutError } = require("mongodb");
const mongoose = require("mongoose");
const Project = require("../models/projectSchema");

module.exports.populate = (application) => {
  const {title,
      description,
      imageUrls,
      goal,
      minimum_stake,
      category,
      stage,
      funding_type,
      owners,
      applications,
      location,}=application
   return new Promise((resolve, reject) => {
    const pro = new Project({
      title,
      description,
      imageUrls,
      goal: {
        target: goal.target,
        deadline: goal.deadline,
      },
      minimum_stake,
      category,
      stage,
      funding_type,
      owners,
      applications,
      location,
    });
    pro.save().then((r) => resolve(pro));
  });
};

module.exports.apply = (apps) => {
  const {id,app} = apps;
  
  return new Promise((resolve, reject) => {
    const result =  Project.findByIdAndUpdate(
        { _id:id },
        { $push: { "applications": app } }
     );
     resolve(result)
  });
  
};

module.exports.reapply = (apps) => {
  const {id,app_id,app} = apps;


  return new Promise((resolve, reject) => {
    const result = Project.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          "applications.$[a].status": app.status,
          "applications.$[a].offer": app.offer,
        },
      },
      { arrayFilters: [{ "a._id": app_id }] }
    );
    resolve(result);
  });
};

module.exports.approve = (ids) => {
  const { _id, app_id } = ids;
  return new Promise((resolve, reject) => {
    const result=Project.findByIdAndUpdate(
      { _id:_id },
      { $set: { "applications.$[a].status": 1 } },
      { arrayFilters: [{ "a._id": app_id }] }
    );
    resolve(result);
  });
};

module.exports.rejectApplication = (ids) => {
    const {_id,app_id}=ids
   
  return new Promise((resolve, reject) => {
    const result = Project.findByIdAndUpdate(
      { _id: _id },
      { $set: { "applications.$[a].status": 2 } },
      { arrayFilters: [{ "a._id": app_id }] }
    );
    resolve(result);
  });
};


module.exports.withdrawApplication = (ids) => {
 const{_id,app_id}=ids

  return new Promise((resolve, reject) => {
    const result=Project.findByIdAndUpdate(
      { _id: project_id },
      { $pull: { applicatioins: "applications.$[a]" } },
      { arrayFilters: [{ "a._id": app_id }] }
    );
    resolve(result);
  });
};


module.exports.getAllApplications = () => {
  return new Promise((resolve, reject) => {
    const result = Project.find({}, {"title":1,"applications":1,"location":1 })
    resolve(result);
  });
};

module.exports.getApplicationById = (id) => {
  return new Promise((resolve, reject) => {
    const result = Project.find(
      { _id: id });
    resolve(result);
  });
};
module.exports.getApplicationByInvestorId = (filter) => {
    const{id,inv_id}=filter
  return new Promise((resolve, reject) => {
    const result = Project.find(
      { _id: id, "applications.investor._id": inv_id },
      { "title": 1, "applications": 1, "location": 1 }
    );
    resolve(result);
  });
};
module.exports.getProjectByOwnerId = (filter) => {
    const{own_id}=filter
  return new Promise((resolve, reject) => {
    const result = Project.find(
      {"owners._id": own_id },
      
    );
    resolve(result);
  });
};