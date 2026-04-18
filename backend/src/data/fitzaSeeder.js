require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const mongoose = require('mongoose');
const Product = require('../models/product.model');

// Inline price parser — strips commas from "1,499" → 1499
const parsePrice = (val) => {
  if (!val) return 0;
  return parseFloat(String(val).replace(/,/g, '').trim()) || 0;
};

const CSV_PATH = path.join(__dirname, 'Fitza.csv');

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    const existing = await Product.countDocuments();
    if (existing > 0) {
      console.log(`Database already has ${existing} products. Skipping seed.`);
      process.exit(0);
    }

    const records = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(CSV_PATH)
        .pipe(parse({ columns: true, skip_empty_lines: true, trim: true }))
        .on('data', (row) => {
          const discountPrice = parsePrice(row['Discount Price (in Rs.)']);
          const originalPrice = parsePrice(row['Original Price (in Rs.)']);
          const discountPercent = originalPrice > 0
            ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
            : 0;

          records.push({
            productId:      row['Id_Product'] || '',
            name:           row['Description'] || '',
            brand:          (row['Brand'] || '').toLowerCase().trim(),
            category:       row['Category_by_gender'] || '',
            discountPrice,
            originalPrice,
            color:          (row['Color'] || '').toLowerCase().trim(),
            imageUrl:       row['URL_image'] || '',
            productUrl:     row['Product_URL'] || '',
            discountPercent,
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`Parsed ${records.length} records. Inserting into MongoDB...`);
    await Product.insertMany(records, { ordered: false });
    console.log(`✅ Seeded ${records.length} products successfully!`);
    process.exit(0);
  } catch (err) {
    console.error(`❌ Seeding failed: ${err.message}`);
    process.exit(1);
  }
};

seedProducts();