const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const userRepository = require('../repositories/user.repository');

class AuthService {
  _generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
  }

  async register({ name, email, password }) {
    const exists = await userRepository.emailExists(email);
    if (exists) {
      const err = new Error('Email already registered.');
      err.statusCode = 409;
      throw err;
    }
    const user = await userRepository.create({ name, email, password });
    const token = this._generateToken(user._id);
    return { user, token };
  }

  async login({ email, password }) {
    const user = await User.findOne({ 
      email: email.toLowerCase().trim() 
    }).select('+password');

    if (!user) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const token = this._generateToken(user._id);
    const userObj = user.toJSON(); // password removed by toJSON()

    return { user: userObj, token };
  }

  async getProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const err = new Error('User not found.');
      err.statusCode = 404;
      throw err;
    }
    return user;
  }
}

module.exports = new AuthService();