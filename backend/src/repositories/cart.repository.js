const Cart = require('../models/cart.model');

const findByUser = async (userId) => {
  return Cart.findOne({ user: userId }).populate('items.product');
};

const findOrCreate = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
    cart = await Cart.findOne({ user: userId }).populate('items.product');
  }
  return cart;
};

const save = async (cart) => {
  await cart.save();
  // Return fresh populated version after save
  return Cart.findOne({ user: cart.user }).populate('items.product');
};

const deleteByUser = async (userId) => {
  return Cart.findOneAndDelete({ user: userId });
};

module.exports = { findByUser, findOrCreate, save, deleteByUser };