// Authentication Controller
auth.controller.js
const authService = require('../services/auth.service');
const { successResponse } = require('../utils/helpers');

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return successResponse(res, result, 'Registration successful.', 201);
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return successResponse(res, result, 'Login successful.');
  } catch (err) { next(err); }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user._id);
    return successResponse(res, { user });
  } catch (err) { next(err); }
};

module.exports = { register, login, getProfile };