// Seeder Script to Load Fitza.csv into Database
const fs = require('fs');
const path = require('path');
const Product = require('../models/product.model');

const seedDatabase = async () => {
  const filePath = path.join(__dirname, '../../Fitza.csv');
  const data = fs.readFileSync(filePath, 'utf8');
  const rows = data.split('\n').slice(1); // Skip header

  for (const row of rows) {
    const [url, brand, description, id, imageUrl, category, discountPrice, originalPrice, color] = row.split(',');
    await Product.create({
      name: description,
      brand,
      category,
      discountPrice: parseFloat(discountPrice),
      originalPrice: parseFloat(originalPrice),
      color,
      imageUrl,
    });
  }

  console.log('Database seeded successfully');
};

seedDatabase().catch(console.error);