const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const geocoder = require('../utils/geoCoder');

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  goal: {
    target: Number,
    deadline: String,
  },
  minimum_stake: Number,
  imageUrl: String,
  category: String,
  stage: String,
  funding_type: String,
  owners: [
    {
      firstname: String,
      lastname: String,
      email: String,
      location: [Number],
    },
  ],

  applications: [
    {
      investor: {
        firstname: String,
        lastname: String,
        location: [Number],
        email: String,
      },
      status: Number,
      Offer: Number,
    },
  ],
  address: String,
  location: [Number],
});

projectSchema.index({ location: "2d" });

module.exports = mongoose.model("projects", projectSchema);
