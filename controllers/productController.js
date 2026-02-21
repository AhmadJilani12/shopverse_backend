const Product = require('../models/product');
const connectDB = require('../config/db');

// GET all products (serverless-safe)
exports.getProducts = async (req, res) => {
    try {
        // ✅ Connect to DB safely
        await connectDB();

        // ✅ Optional: Pagination & sorting
        const { page = 1, limit = 12, sort = '-createdAt' } = req.query;

        const products = await Product.find()
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Product.countDocuments();

        res.status(200).json({
            products,
            page: Number(page),
            pages: Math.ceil(total / limit),
            total,
        });

    } catch (err) {
        console.error('DB/Controller Error:', err.message);
        res.status(500).json({ message: 'Database connection failed' });
    }
};