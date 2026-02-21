const { createReview, getProductReviews, deleteReview } = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/auth');
const connectDB = require('../config/db');
const createApp = require('../server');

const handler = async (req, res) => {
    await connectDB();
    const app = createApp();

    app.post('/api/reviews', verifyToken, createReview);
    app.get('/api/reviews/:productId', getProductReviews);
    app.delete('/api/reviews/:id', verifyToken, deleteReview);

    app(req, res);
};

module.exports = handler;