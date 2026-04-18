const Product = require('../models/product.model');

class ProductRepository {
  async findAll({ brand, category, minPrice, maxPrice, search, page = 1, limit = 20, sort = '-createdAt' } = {}) {
    const query = {};

    if (brand) query.brand = { $regex: brand, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };
    if (search) query.$text = { $search: search };
    if (minPrice || maxPrice) {
      query.discountPrice = {};
      if (minPrice) query.discountPrice.$gte = Number(minPrice);
      if (maxPrice) query.discountPrice.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sort || '-createdAt')
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Product.countDocuments(query),
    ]);

    return { products, total, page: Number(page), limit: Number(limit) };
  }

  async findById(id) {
    return Product.findById(id);
  }

  async bulkCreate(products) {
    return Product.insertMany(products, { ordered: false });
  }

  async count() {
    return Product.countDocuments();
  }

  async getDistinctBrands() {
    return Product.distinct('brand');
  }

  async getDistinctCategories() {
    return Product.distinct('category');
  }
}

module.exports = new ProductRepository();