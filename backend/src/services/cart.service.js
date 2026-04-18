const Cart = require('../models/cart.model');
const productRepository = require('../repositories/product.repository');

class CartService {
  async getCart(userId) {
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) return { items: [], totalPrice: 0 };
    return cart;
  }

  async addItem(userId, productId, quantity = 1) {
    const product = await productRepository.findById(productId);
    if (!product) {
      const err = new Error('Product not found.');
      err.statusCode = 404;
      throw err;
    }

    // Use findOneAndUpdate to avoid race conditions
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create brand new cart
      cart = new Cart({
        user: userId,
        items: [{
          product: productId,
          quantity: Number(quantity),
          price: product.discountPrice,
        }],
        totalPrice: product.discountPrice * Number(quantity),
      });
    } else {
      // Update existing cart
      const existingIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId.toString()
      );

      if (existingIndex >= 0) {
        cart.items[existingIndex].quantity += Number(quantity);
      } else {
        cart.items.push({
          product: productId,
          quantity: Number(quantity),
          price: product.discountPrice,
        });
      }

      cart.totalPrice = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
      );
    }

    await cart.save();

    // Return populated
    return Cart.findOne({ user: userId }).populate('items.product');
  }

  async removeItem(userId, productId) {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) return { items: [], totalPrice: 0 };

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId.toString()
    );
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
    await cart.save();
    return Cart.findOne({ user: userId }).populate('items.product');
  }

  async updateQuantity(userId, productId, quantity) {
    if (Number(quantity) < 1) return this.removeItem(userId, productId);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return { items: [], totalPrice: 0 };

    const item = cart.items.find(
      (i) => i.product.toString() === productId.toString()
    );
    if (!item) {
      const err = new Error('Item not in cart.');
      err.statusCode = 404;
      throw err;
    }
    item.quantity = Number(quantity);
    cart.totalPrice = cart.items.reduce(
      (sum, i) => sum + i.price * i.quantity, 0
    );
    await cart.save();
    return Cart.findOne({ user: userId }).populate('items.product');
  }

  async clearCart(userId) {
    return Cart.findOneAndDelete({ user: userId });
  }
}

module.exports = new CartService();