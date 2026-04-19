const { successResponse } = require('../utils/helpers');
const cartService = require('../services/cart.service');

const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user._id);
    return successResponse(res, { cart });
  } catch (err) { next(err); }
};

const addItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.addItem(req.user._id, productId, quantity);
    return successResponse(res, { cart }, 'Item added to cart.');
  } catch (err) { next(err); }
};

const removeItem = async (req, res, next) => {
  try {
    const cart = await cartService.removeItem(req.user._id, req.params.productId);
    return successResponse(res, { cart }, 'Item removed from cart.');
  } catch (err) { next(err); }
};

const updateQuantity = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const cart = await cartService.updateQuantity(req.user._id, req.params.productId, quantity);
    return successResponse(res, { cart }, 'Cart updated.');
  } catch (err) { next(err); }
};

const clearCart = async (req, res, next) => {
  try {
    await cartService.clearCart(req.user._id);
    return successResponse(res, null, 'Cart cleared.');
  } catch (err) { next(err); }
};

module.exports = { getCart, addItem, removeItem, updateQuantity, clearCart };