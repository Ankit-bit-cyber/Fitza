const express = require('express');
const router = express.Router();
const { getCart, addItem, removeItem, updateQuantity, clearCart } = require('../controllers/cart.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validateAddToCart } = require('../middlewares/validation.middleware');

router.use(protect);

router.get('/',              getCart);
router.post('/',             validateAddToCart, addItem);
router.put('/:productId',    updateQuantity);
router.delete('/clear',      clearCart);
router.delete('/:productId', removeItem);

module.exports = router;