const User = require('../models/user.model');

const findByEmail = async (email) => {
  return User.findOne({ email }).select('+password');
};

const findById = async (id) => {
  return User.findById(id);
};

const create = async (data) => {
  return User.create(data);
};

const emailExists = async (email) => {
  const count = await User.countDocuments({ email });
  return count > 0;
};

module.exports = { findByEmail, findById, create, emailExists };