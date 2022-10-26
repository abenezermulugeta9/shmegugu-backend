const { ObjectID } = require('bson');
const { default: mongoose } = require('mongoose');
const service =require('../services/applicationServices')

module.exports.populate = async (req, res, next) => {
  try {
    const application = req.body;
    const result = await service.populate(application);

    res.json(result);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports.apply = async (req, res, next) => {
  try {
    let application=req.body
    const app_id=mongoose.Types.ObjectId();
    const {id}=req.params
    application={...application, _id:app_id}
    app={app:application,id:id}

    const result = await service.apply(app);

    res.json({success:1});
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports.reapply = async (req, res, next) => {
  try {
    let application = req.body;
    const { id, app_id } = req.params;
    application = { ...application, id: id, app_id: app_id };

    const result = await service.reapply(application);
    res.json(result);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports.approve = async (req, res, next) => {
  try {
    const { id, app_id } = req.params;
    const ids = { _id: id, app_id: app_id };
    const result = await service.approve(ids);
    res.json(result);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports.rejectApplication = async (req, res, next) => {
  try {
    const { id, app_id } = req.params;
    const ids = { _id: id, app_id: app_id };
  
    const result = await service.rejectApplication(ids);
    res.json(result);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports.withdraw = async (req, res, next) => {
  try {
    const { id, app_id } = req.params;
    const ids = { _id: id, app_id: app_id };

    const result = await service.withdrawApplication(ids);
    res.json(result);
  } catch (err) {
    throw new Error(err.message);
  }
};


module.exports.getAllApplications = async (req, res, next) => {
  try {   

    const result = await service.getAllApplications();
    res.json(result);
  } catch (err) {
    throw new Error(err.message);
  }
};


module.exports.getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.getApplicationById(id);
    res.json(result);
  } catch (err) {
    throw new Error(err.message);
  }
};


module.exports.getApplicationByInvestorId = async (req, res, next) => {
  try {
    const { id, inv_id } = req.params;
    const filter={id,inv_id}
    const result = await service.getApplicationByInvestorId(filter);
    res.json(result);
  } catch (err) {
    throw new Error(err.message);
  }
};


module.exports.getProjectByOwnerId = async (req, res, next) => {
  try {
    const {own_id } = req.params;
    const filter={own_id}
    const result = await service.getProjectByOwnerId(filter);
    res.json(result);
  } catch (err) {
    throw new Error(err.message);
  }
};