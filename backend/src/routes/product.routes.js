const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getFilterOptions } = require('../controllers/product.controller');

// All product routes are PUBLIC — no protect middleware
router.get('/',        getProducts);
router.get('/filters', getFilterOptions);
router.get('/:id',     getProductById);

module.exports = router;