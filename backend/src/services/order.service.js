const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

class OrderService {
  async createOrder(userId, shippingAddress) {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || !cart.items || cart.items.length === 0) {
      const err = new Error('Cart is empty. Add items before placing an order.');
      err.statusCode = 400;
      throw err;
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id || item.product,
      quantity: item.quantity,
      price: item.price,
      name: item.product?.name || '',
      imageUrl: item.product?.imageUrl || '',
    }));

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice: cart.totalPrice,
      shippingAddress: shippingAddress || {},
      status: 'pending',
    });

    await Cart.findOneAndDelete({ user: userId });
    return order;
  }

  async getMyOrders(userId) {
    const userIdStr = userId.toString();
    const all = await Order.find({})
      .populate('items.product', 'name imageUrl brand')
      .sort('-createdAt')
      .lean();
    return all.filter(o => o.user.toString() === userIdStr);
  }

  async getOrderById(orderId) {
    const order = await Order.findById(orderId)
      .populate('items.product')
      .lean();
    if (!order) {
      const err = new Error('Order not found.');
      err.statusCode = 404;
      throw err;
    }
    return order;
  }
}

module.exports = new OrderService();