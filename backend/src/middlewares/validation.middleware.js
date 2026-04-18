const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format.' });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }
  next();
};

const validateAddToCart = (req, res, next) => {
  const { productId, quantity } = req.body;
  if (!productId) {
    return res.status(400).json({ success: false, message: 'productId is required.' });
  }
  if (quantity && (isNaN(quantity) || quantity < 1)) {
    return res.status(400).json({ success: false, message: 'quantity must be a positive number.' });
  }
  next();
};

module.exports = { validateRegister, validateLogin, validateAddToCart };