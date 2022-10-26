const User = require('../models/userSchema');
const mongoose = require('mongoose');

module.exports.addUser = (user) => {
  return new Promise(resolve => {
    const data = new User(user)
    resolve(
      data.save()
    )
  })
}

module.exports.getUserByEmail = (email) => {
  return new Promise((resolve) => {
    const user = User.findOne({ email: email });
    resolve(user);
  });
}

module.exports.getUserById = (id) => {
  return new Promise((resolve) => {
    const user = User.findOne({ _id: id }, { password: 0 });
    resolve(user);
  });
}

module.exports.updateUser = (id, data) => {
  return new Promise((resolve) => {
    const user = User.findByIdAndUpdate({ _id: id }, data, { new: true });
    resolve(user);
  });
}