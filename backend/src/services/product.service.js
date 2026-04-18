const productRepository = require('../repositories/product.repository');

class ProductService {
  async getProducts(filters) {
    return productRepository.findAll(filters);
  }

  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      const err = new Error('Product not found.');
      err.statusCode = 404;
      throw err;
    }
    return product;
  }

  async getFilterOptions() {
    const [brands, categories] = await Promise.all([
      productRepository.getDistinctBrands(),
      productRepository.getDistinctCategories(),
    ]);
    return { brands: brands.sort(), categories: categories.sort() };
  }

  async getTotalCount() {
    return productRepository.count();
  }
}

module.exports = new ProductService();