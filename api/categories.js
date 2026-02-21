const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const connectDB = require('../config/db');
const createApp = require('../server');

const handler = async (req, res) => {
    await connectDB();
    const app = createApp();

    app.get('/api/categories', getCategories);
    app.get('/api/categories/:id', getCategory);
    app.post('/api/categories', verifyToken, isAdmin, createCategory);
    app.put('/api/categories/:id', verifyToken, isAdmin, updateCategory);
    app.delete('/api/categories/:id', verifyToken, isAdmin, deleteCategory);

    app(req, res);
};

module.exports = handler;