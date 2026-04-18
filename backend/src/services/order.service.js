const orderRepository = require('../repositories/order.repository');
const cartRepository = require('../repositories/cart.repository');

class OrderService {
  async createOrder(userId, shippingAddress) {
    const cart = await cartRepository.findByUser(userId);
    if (!cart || cart.items.length === 0) {
      const err = new Error('Cart is empty.');
      err.statusCode = 400;
      throw err;
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id || item.product,
      quantity: item.quantity,
      price: item.price,
      name: item.product.name || '',
      imageUrl: item.product.imageUrl || '',
    }));

    const order = await orderRepository.create({
      user: userId,
      items: orderItems,
      totalPrice: cart.totalPrice,
      shippingAddress: shippingAddress || {},
    });

    await cartRepository.deleteByUser(userId);
    return order;
  }

  async getMyOrders(userId) {
    return orderRepository.findByUser(userId);
  }

  async getOrderById(orderId) {
    const order = await orderRepository.findById(orderId);
    if (!order) {
      const err = new Error('Order not found.');
      err.statusCode = 404;
      throw err;
    }
    return order;
  }
}

module.exports = new OrderService();