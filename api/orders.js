const { createOrder, getMyOrders, getOrder, updateOrderStatus } = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { validateOrder } = require('../middleware/validate');
const connectDB = require('../config/db');
const createApp = require('../server');

const handler = async (req, res) => {
    await connectDB();
    const app = createApp();

    app.post('/api/orders', verifyToken, validateOrder, createOrder);
    app.get('/api/orders/me', verifyToken, getMyOrders);
    app.get('/api/orders/:id', verifyToken, getOrder);
    app.put('/api/orders/:id/status', verifyToken, isAdmin, updateOrderStatus);

    app(req, res);
};

module.exports = handler;