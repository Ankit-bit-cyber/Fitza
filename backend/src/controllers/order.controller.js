// const orderService = require('../services/order.service');
// const { successResponse } = require('../utils/helpers');

// const createOrder = async (req, res, next) => {
//   try {
//     const order = await orderService.createOrder(req.user._id, req.body.shippingAddress);
//     return successResponse(res, { order }, 'Order placed successfully.', 201);
//   } catch (err) { next(err); }
// };

// const getMyOrders = async (req, res, next) => {
//   try {
//     const orders = await orderService.getMyOrders(req.user._id);
//     return successResponse(res, { orders });
//   } catch (err) { next(err); }
// };

// const getOrderById = async (req, res, next) => {
//   try {
//     const order = await orderService.getOrderById(req.params.id);
//     return successResponse(res, { order });
//   } catch (err) { next(err); }
// };

// module.exports = { createOrder, getMyOrders, getOrderById };
const Order = require('../models/order.model');
const orderService = require('../services/order.service');
const { successResponse } = require('../utils/helpers');

const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.user._id, req.body.shippingAddress);
    return successResponse(res, { order }, 'Order placed successfully.', 201);
  } catch (err) { next(err); }
};

const getMyOrders = async (req, res, next) => {
  try {
    console.log('GET ORDERS for user:', req.user._id);
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name imageUrl brand')
      .sort('-createdAt')
      .lean();
    console.log('Orders found:', orders.length);
    return successResponse(res, { orders });
  } catch (err) { 
    console.error('Orders error:', err.message);
    next(err); 
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .lean();
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }
    return successResponse(res, { order });
  } catch (err) { next(err); }
};

module.exports = { createOrder, getMyOrders, getOrderById };