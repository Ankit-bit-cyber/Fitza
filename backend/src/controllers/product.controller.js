const productService = require('../services/product.service');
const { successResponse, paginatedResponse } = require('../utils/helpers');

const getProducts = async (req, res, next) => {
  try {
    const { products, total, page, limit } = await productService.getProducts(req.query);
    return paginatedResponse(res, products, total, page, limit);
  } catch (err) { next(err); }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    return successResponse(res, { product });
  } catch (err) { next(err); }
};

const getFilterOptions = async (req, res, next) => {
  try {
    const options = await productService.getFilterOptions();
    return successResponse(res, options);
  } catch (err) { next(err); }
};

module.exports = { getProducts, getProductById, getFilterOptions };