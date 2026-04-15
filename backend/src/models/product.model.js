// Product Model
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  discountPrice: Number,
  originalPrice: Number,
  color: String,
  imageUrl: String,
});

module.exports = mongoose.model('Product', productSchema);