const { createStripeIntent, confirmStripePayment, processCod } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/auth');
const connectDB = require('../config/db');
const createApp = require('../server');

const handler = async (req, res) => {
    await connectDB();
    const app = createApp();

    app.post('/api/payments/stripe', verifyToken, createStripeIntent);
    app.post('/api/payments/stripe/confirm', verifyToken, confirmStripePayment);
    app.post('/api/payments/cod', verifyToken, processCod);

    app(req, res);
};

module.exports = handler;