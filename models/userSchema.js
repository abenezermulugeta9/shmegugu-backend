const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const geocoder = require('../utils/geoCoder');

const userSchema = mongoose.Schema({
  firstname:  {
    type: String,
    required: true,
    maxLength: 25
  },
  lastname:  {
    type: String,
    required: true,
    maxLength: 25
  },
  password: {
    type: String,
    required: true,
    minLength: 8
},
  address: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    require: true,
    validate: [isEmailValid, 'Please Provide a valid email Address']
  },

  phone:  {
    type: String,
    required: true,
    maxLength: 15
  },
  role: {
    type: String,
    required: true
  },
  avatarUrl: String,
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
});

// geocode's pre-user persistence operation
userSchema.pre('save', async function (req, res, next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save the address submitted by the user
  this.address = undefined;
  next();
});

function isEmailValid(email) {
  if (!email)
      return false;

  if(email.length>50)
      return false;

  const firstPart = email.split("@");
  if(firstPart[0].length>25)
      return false;
  
  const secondPart = firstPart[1].split(".");
  if(secondPart[1] > 10)
       return false;
  
  return true;
}

module.exports = mongoose.model("User", userSchema);
