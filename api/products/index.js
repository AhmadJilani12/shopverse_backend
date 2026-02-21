const { getProducts, createProduct, uploadImages } = require('../../controllers/productController');
const connectDB = require('../../config/db');
const { verifyToken, isAdmin } = require('../../middleware/auth');

export default async function handler(req, res) {
  await connectDB();
  if(req.method === 'GET') return getProducts(req, res);
  if(req.method === 'POST') {
      await verifyToken(req, res);
      await isAdmin(req, res);
      await uploadImages(req, res);
      return createProduct(req, res);
  }
  res.status(405).json({ message: 'Method not allowed' });
}