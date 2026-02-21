const { getProducts } = require('../../controllers/productController');
const connectDB = require('../../config/db');

module.exports = async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'GET') return getProducts(req, res);

    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    console.error('Serverless function error:', err);
    res.status(500).json({ message: err.message });
  }
};