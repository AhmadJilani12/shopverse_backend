const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadImages } = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const connectDB = require('../config/db');
const createApp = require('../server');

const handler = async (req, res) => {
    await connectDB();
    const app = createApp();

    app.get('/api/products', getProducts);
    app.get('/api/products/:id', getProduct);
    app.post('/api/products', verifyToken, isAdmin, uploadImages, createProduct);
    app.put('/api/products/:id', verifyToken, isAdmin, uploadImages, updateProduct);
    app.delete('/api/products/:id', verifyToken, isAdmin, deleteProduct);

    app(req, res);
};

module.exports = handler;