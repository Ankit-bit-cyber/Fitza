const Order = require('../models/order.model');

const create = async (data) => {
  return Order.create(data);
};

const findByUser = async (userId) => {
  const mongoose = require('mongoose');
  return Order.find({ user: new mongoose.Types.ObjectId(userId) })
    .populate('items.product', 'name imageUrl brand')
    .sort('-createdAt');
};

const findById = async (id) => {
  return Order.findById(id).populate('items.product');
};

module.exports = { create, findByUser, findById };